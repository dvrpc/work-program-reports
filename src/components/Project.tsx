import { Page, Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import SVG_1a from "src/images/1a.svg.tsx";
import SVG_1b from "src/images/1b.svg.tsx";
import SVG_1c from "src/images/1c.svg.tsx";
import SVG_1d from "src/images/1d.svg.tsx";
import SVG_1e from "src/images/1e.svg.tsx";
import SVG_2a from "src/images/2a.svg.tsx";
import SVG_2b from "src/images/2b.svg.tsx";
import SVG_2c from "src/images/2c.svg.tsx";
import SVG_2d from "src/images/2d.svg.tsx";
import SVG_2e from "src/images/2e.svg.tsx";
import SVG_3a from "src/images/3a.svg.tsx";
import SVG_3b from "src/images/3b.svg.tsx";
import SVG_3c from "src/images/3c.svg.tsx";
import SVG_3d from "src/images/3d.svg.tsx";
import SVG_3e from "src/images/3e.svg.tsx";
import SVG_4a from "src/images/4a.svg.tsx";
import SVG_4b from "src/images/4b.svg.tsx";
import SVG_4c from "src/images/4c.svg.tsx";
import SVG_4d from "src/images/4d.svg.tsx";
import SVG_4e from "src/images/4e.svg.tsx";
import {
  type Project,
  type FundingDetails,
  type LRPImages,
  type Amendment,
  HighlightFund,
} from "src/Project";
import { TableOfContentsContext } from "src/utils/pageNumberProvider";
import parse from "src/utils/parse";
import { css, cssVars } from "src/utils/styles";

const images: Record<string, () => JSX.Element> = {
  "1a.png": SVG_1a,
  "1b.png": SVG_1b,
  "1c.png": SVG_1c,
  "1d.png": SVG_1d,
  "1e.png": SVG_1e,
  "2a.png": SVG_2a,
  "2b.png": SVG_2b,
  "2c.png": SVG_2c,
  "2d.png": SVG_2d,
  "2e.png": SVG_2e,
  "3a.png": SVG_3a,
  "3b.png": SVG_3b,
  "3c.png": SVG_3c,
  "3d.png": SVG_3d,
  "3e.png": SVG_3e,
  "4a.png": SVG_4a,
  "4b.png": SVG_4b,
  "4c.png": SVG_4c,
  "4d.png": SVG_4d,
  "4e.png": SVG_4e,
};

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function ProjectView({
  children,
  project,
}: {
  children?: JSX.Element;
  pageBreak?: boolean;
  project: Project | Amendment;
}) {
  const { addToTableOfContents } = useContext(TableOfContentsContext);

  return (
    <Page
      size="LETTER"
      style={{
        fontFamily: cssVars.fontFamily,
        fontSize: "11pt",
        paddingTop: "0.5in",
        paddingLeft: "0.75in",
        paddingRight: "0.75in",
        paddingBottom: "0.6in",
        width: "auto",
      }}
      wrap
    >
      <View>
        <View
          render={({ pageNumber }) => {
            addToTableOfContents({
              id: project.proid,
              title: project.proname,
              pageNumber,
              level: 0,
            });
            return null;
          }}
        ></View>
        <View>
          <View style={css`border-b-[2px] border-black font-bold flex w-full`}>
            <Text
              style={{
                width: "25%",
                fontWeight: "bold",
                fontFamily: `${cssVars.fontFamily}-Bold`,
              }}
            >
              PROJECT: {project.proid}
            </Text>
            <Text style={{ width: "75%" }}>{project.proname}</Text>
          </View>
          <View style={css`flex w-full mt-1`}>
            <Text
              style={{
                width: "25%",
                fontWeight: "bold",
                fontFamily: `${cssVars.fontFamily}-Bold`,
              }}
            >
              Responsible Agency:
            </Text>
            <Text style={{ width: "75%" }}>{project.respagency}</Text>
          </View>
          <View style={css`flex w-full mt-1`}>
            <Text
              style={{
                width: "25%",
                fontWeight: "bold",
                fontFamily: `${cssVars.fontFamily}-Bold`,
              }}
            >
              Program Coordinator:
            </Text>
            <Text style={{ width: "75%" }}>{project.coordinator}</Text>
          </View>
          <View style={css`flex w-full mt-1`}>
            <Text
              style={{
                width: "25%",
                fontWeight: "bold",
                fontFamily: `${cssVars.fontFamily}-Bold`,
              }}
            >
              Project Manager(s):
            </Text>
            <Text style={{ width: "75%" }}>{project.managers}</Text>
          </View>
          {project.lrpimages && (
            <View style={css`flex w-full mt-1`}>
              <Text
                style={{
                  width: "25%",
                  fontFamily: `${cssVars.fontFamily}-Bold`,
                  fontWeight: "bold",
                }}
              >
                Supports LRP Goals:
              </Text>
              <View style={{ width: "75%" }}>
                <View style={css`flex`}>
                  {Object.values(
                    (JSON.parse(project.lrpimages) as LRPImages[])[0],
                  ).map((image: string | null) => {
                    if (image && image in images) {
                      const Image = images[image];
                      return <Image key={image} />;
                    }
                    return null;
                  })}
                </View>
              </View>
            </View>
          )}
        </View>
        <Text style={css`font-bold`}>Goals:</Text>
        {parse(project.goals ?? "")}
        <Text style={css`font-bold`}>Description:</Text>
        {parse(project.description ?? "")}
        <Text style={css`font-bold`}>Tasks:</Text>
        {parse(project.tasks ?? "")}
        <Text style={css`font-bold`}>Products:</Text>
        {parse(project.products ?? "")}
        <Text style={css`font-bold`}>Beneficiaries:</Text>
        {parse(project.beneficiaries ?? "")}
        <View wrap={false}>
          <Text style={css`font-bold`}>Project Cost and Funding:</Text>
          <View style={css`border-y border-black w-full`}>
            <View style={css`flex font-bold pt-1`}>
              <Text style={{ width: "10%" }}>FY</Text>
              <Text style={{ width: "11%" }}>Total</Text>
              <Text style={{ width: "22%" }}>Highway PL Program</Text>
              <Text style={{ width: "22%" }}>Transit PL Program</Text>
              <Text style={{ width: "25%" }}>Comprehensive Planning</Text>
              <Text style={{ width: "10%" }}>Other</Text>
            </View>
            {(JSON.parse(project.funding_details ?? "[]") as FundingDetails[])
              .sort((a, b) => a.fy - b.fy)
              .map((row) => (
                <View
                  key={row.fy + row.total}
                  style={
                    "highlightfund" in project &&
                    [HighlightFund.Both, HighlightFund.Table].some(
                      (i) => i === project.highlightfund,
                    )
                      ? css`border-t border-black bg-yellow-500 flex mt-1`
                      : css`border-t border-black flex pt-1`
                  }
                >
                  <Text style={{ width: "10%" }}>{row.fy}</Text>
                  <Text style={{ width: "11%" }}>
                    {row.total && USDollar.format(+row.total)}
                  </Text>
                  <Text style={{ width: "22%" }}>
                    {row.highway && USDollar.format(+row.highway)}
                  </Text>
                  <Text style={{ width: "22%" }}>
                    {row.transit && USDollar.format(+row.transit)}
                  </Text>
                  <Text style={{ width: "25%" }}>
                    {row.comprehensive && USDollar.format(+row.comprehensive)}
                  </Text>
                  <Text style={{ width: "10%" }}>
                    {row.other && USDollar.format(+row.other)}
                  </Text>
                </View>
              ))}
          </View>
          {project.fundingnote && (
            <>
              <Text style={css`mt-1`}>FY2026 Other Funding Details:</Text>
              <Text
                style={
                  "highlightfund" in project &&
                  [HighlightFund.Both, HighlightFund.Notes].some(
                    (i) => i === project.highlightfund,
                  )
                    ? css`bg-yellow-500`
                    : css`text-base`
                }
              >
                {parse(project.fundingnote)}
              </Text>
            </>
          )}
        </View>
      </View>
      {children}
    </Page>
  );
}
