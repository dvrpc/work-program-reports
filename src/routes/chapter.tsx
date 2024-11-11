import { Document, Page, PDFDownloadLink } from "@react-pdf/renderer";
import {
  Form,
  LoaderFunctionArgs,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import Footer from "src/components/Footer";
import ProjectView from "src/components/Project";
import { Project } from "src/Project";
import { cssVars } from "src/utils/styles";

interface JSONType {
  items?: Project[];
}

export function ChapterLoader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const [chapter, section] = url.searchParams.get("chapter") ?? "  ";
  return fetch(
    `https://apps.dvrpc.org/ords/workprogram${params.yr}/workprogram/projects?chapterno=${chapter}&subsection=${section}`,
    { signal: request.signal },
  );
}

export default function ChapterRoute() {
  const data = useLoaderData() as JSONType | undefined;
  const [searchParams] = useSearchParams();
  const startingPage = parseInt(searchParams.get("page") ?? "1");

  return (
    <>
      <Form>
        <select name="chapter">
          <option>2A</option>
          <option>2B</option>
          <option>3A</option>
          <option>3B</option>
          <option>4A</option>
          <option>4B</option>
          <option>5</option>
        </select>
        <input
          type="text"
          name="page"
          defaultValue="1"
          placeholder="Starting Page"
        />
        <button>Submit</button>
      </Form>
      {data?.items?.length ? (
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
                {data.items.map((project, index) => (
                  <ProjectView pageBreak={index !== 0} project={project} />
                ))}
                <Footer startingPage={startingPage} />
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
      ) : (
        "No projects found"
      )}
    </>
  );
}
