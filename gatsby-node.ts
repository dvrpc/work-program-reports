const path = require("path");
import { readFileSync } from "fs";
import { CreateWebpackConfigArgs, CreatePageArgs } from "gatsby";
import puppeteer from "puppeteer";

//Add SVG data url loader
exports.onCreateWebpackConfig = ({
  actions,
  getConfig,
}: CreateWebpackConfigArgs) => {
  //Find the default image loader and remove SVG
  const originalRule = getConfig().module.rules.find((rule: any) =>
    rule.test.toString().includes("svg")
  );
  originalRule.test = new RegExp(
    originalRule.test.toString().replace("svg|", "")
  );

  //Merges with existing webpack configuration
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.svg/,
          use: {
            loader: "svg-url-loader",
          },
        },
      ],
    },
  });
};

//Delete the "dummy" page
exports.onCreatePage = async ({
  page,
  actions: { deletePage },
}: CreatePageArgs) => {
  if (page.path.match(/^\/project\/$/)) {
    deletePage(page);
  }
};

//Generate PDFs of every project using Puppeteer
exports.onPostBuild = async ({ graphql, reporter }) => {
  const activity = reporter.activityTimer("Generating PDFs");
  activity.start();
  const { data } = await graphql(`
    query PDFQuery {
      allProjects {
        nodes {
          proid
          proname
          respagency
          coordinator
          managers
          goals
          description
          tasks
          products
          beneficiaries
          fundingnote
          funding_details
          lrpimages
        }
      }
    }
  `);
  const browser = await puppeteer.launch({
    headless: true,
    timeout: 0,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  for (const project of data.allProjects.nodes) {
    try {
      await page.setContent(
        readFileSync(
          path.join(__dirname, `public/project/${project.proid}/index.html`),
          {
            encoding: "utf8",
          }
        ),
        { waitUntil: "domcontentloaded" }
      );
      await page.emulateMediaType("print");
      await page.pdf({
        path: path.join(__dirname, `public/project/${project.proid}.pdf`),
        format: "letter",
        margin: {
          left: "0.5in",
          bottom: "0.5in",
          right: "0.5in",
          top: "0.5in",
        },
        printBackground: true,
      });
    } catch (e) {
      reporter.warn("Puppeteer error: " + e);
    }
  }
  browser.close();
  activity.end();
};
