import {
  Document,
  Page,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import Footer from "src/components/Footer";
import ProjectView from "src/components/Project";
import { Project } from "src/Project";
import { cssVars } from "src/utils/styles";

interface JSONType {
  items?: Project[];
}

export function ProjectRouteLoader({ request, params }: LoaderFunctionArgs) {
  return fetch(
    `https://apps.dvrpc.org/ords/workprogram${params.yr}/workprogram/projects?proid=${params.proid}`,
    { signal: request.signal },
  );
}

export default function ProjectRoute() {
  const data = useLoaderData() as JSONType | undefined;

  return data?.items?.length ? (
    <>
      <h1 className="border-b-[3px] border-black font-bold">
        {data.items[0].proid}: {data.items[0].proname}
      </h1>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4">
        <dt className="font-bold">Responsible Agency:</dt>
        <dd>{data.items[0].respagency}</dd>

        <dt className="font-bold">Program Coordinator:</dt>
        <dd>{data.items[0].coordinator}</dd>

        <dt className="font-bold">Project Manager(s):</dt>
        <dd>{data.items[0].managers}</dd>
      </dl>
      <PDFDownloadLink
        style={{
          display: "flex",
          textDecoration: "none",
          placeContent: "center",
          marginTop: 32,
        }}
        document={
          <Document>
            <Page
              wrap
              size="LETTER"
              style={{
                fontFamily: cssVars.fontFamily,
                fontSize: "11pt",
                paddingHorizontal: "0.5in",
                paddingVertical: "0.5in",
                width: "auto",
              }}
            >
              <ProjectView project={data.items[0]} />
              <Footer />
            </Page>
          </Document>
        }
        fileName="project.pdf"
      >
        <div
          style={{
            background: "#0078ae",
            borderRadius: 8,
            padding: "10px 15px",
            fontFamily: "sans-serif",
            color: "white",
          }}
        >
          Download PDF
        </div>
      </PDFDownloadLink>
    </>
  ) : (
    <p>No project found.</p>
  );
}
