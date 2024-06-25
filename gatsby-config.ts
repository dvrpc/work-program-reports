import type { GatsbyConfig } from "gatsby";
import type { Project } from "./src/Project";

const projectMock: Project = {
  proid: "",
  proname: "",
  coordinator: "",
  managers: "",
  showlive: "F",
  chapterno: 1,
  subsection: "",
  subsectiontitle: "",
  respagency: "",
  goals: "",
  description: "",
  tasks: "",
  products: "",
  beneficiaries: "",
  fundingnote: "",
  funding_details: "json_string",
  lrpimages: "json_string",
};

const config: GatsbyConfig = {
  pathPrefix: "/wp25-reports",
  siteMetadata: {
    title: "work-program-reports",
    year: "FY2025",
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@src": "src",
          "@components": "src/components",
          "@images": "src/images",
          "@layouts": "src/layouts",
          "@pages": "src/pages",
          "@templates": "src/templates",
        },
        extensions: ["js", "ts", "jsx", "tsx"],
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        url: "https://apps.dvrpc.org/ords/workprogram25new/workprogram/projects",
        name: "projects",
        payloadKey: "items",
        schemaType: projectMock,
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        url: "https://apps.dvrpc.org/ords/workprogram25new/workprogram/draftamendment",
        name: "amendments",
        payloadKey: "items",
        schemaType: projectMock,
      },
    },
    "gatsby-plugin-postcss",
  ],
};

export default config;
