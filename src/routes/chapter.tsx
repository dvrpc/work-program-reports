import { Document, Page, PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import {
  Form,
  LoaderFunctionArgs,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import Footer from "src/components/Footer";
import ProjectView from "src/components/Project";
import TableOfContents from "src/components/TableOfContents";
import { Project } from "src/Project";
import { TableOfContentsProvider } from "src/utils/pageNumberProvider";

interface JSONType {
  items?: Project[];
}

interface KeyValuePair {
  key: string;
  value: string;
}

const chapterTitles: Record<string, string> = {
  "2A": "DVRPC Program Area Descriptions",
  "2B": "DVRPC Project Descriptions",
  "3A": "PA Supportive Regional Highway Planning Program (SRHPP)",
  "3B": "NJ Supportive Regional Highway Planning Program (SRHPP)",
  "4A": "PA Transit Support Program (TSP)",
  "4B": "NJ Transit Support Program (TSP)",
  "5A": "Other Member Government Projects",
  "5B": "New Jersey CRRSAA-funded Projects",
  "6": "Continuing Projects",
  "": "",
};
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
  const defaultKeyValuePairs = searchParams
    .getAll("key")
    .map((key, i) => ({ key, value: searchParams.getAll("value")[i] }));
  const [keyValuePairs, setKeyValuePairs] = useState<KeyValuePair[]>(
    defaultKeyValuePairs ?? [{ key: "", value: "" }],
  );
  if (keyValuePairs.length === 0) {
    setKeyValuePairs([{ key: "", value: "" }]);
  }

  return (
    <>
      <Form>
        <div>
          <label className="block font-bold" htmlFor="chapter">
            Chapter
          </label>
          <select
            name="chapter"
            defaultValue={searchParams.get("chapter") ?? "2A"}
          >
            <option>2A</option>
            <option>2B</option>
            <option>3A</option>
            <option>3B</option>
            <option>4A</option>
            <option>4B</option>
            <option>5A</option>
            <option>5B</option>
            <option>6</option>
          </select>
        </div>
        <div>
          <label className="block font-bold" htmlFor="page">
            Starting Page Number
          </label>
          <input
            type="number"
            name="page"
            defaultValue={startingPage}
            placeholder="Starting Page"
          />
        </div>
        <h3 className="mt-4 text-lg font-bold">Tables</h3>
        <div className="grid grid-cols-3 gap-2">
          <div>Table Title</div>
          <div>Page Number</div>
        </div>
        {keyValuePairs.map((pair, index) => (
          <Row
            key={pair.key + index}
            value={pair.value}
            name={pair.key}
            index={index}
            keyValuePairs={keyValuePairs}
            setKeyValuePairs={setKeyValuePairs}
          />
        ))}
        <button
          style={{
            background: "#0078ae",
            borderRadius: 8,
            padding: "10px 15px",
            fontFamily: "sans-serif",
            color: "white",
          }}
          value="generate"
          name="action"
        >
          Submit
        </button>
      </Form>
      {searchParams.get("action") && data?.items?.length ? (
        <PDFDownloadLink
          style={{
            display: "flex",
            textDecoration: "none",
            placeContent: "center",
            marginTop: 32,
          }}
          document={
            <TableOfContentsProvider>
              <Document>
                <TableOfContents
                  chapterTitle={
                    chapterTitles[searchParams.get("chapter") ?? ""]
                  }
                  chapterNo={searchParams.get("chapter") ?? ""}
                  keyValuePairs={keyValuePairs}
                  startingPage={startingPage}
                >
                  <Footer
                    chapterTitle={
                      chapterTitles[searchParams.get("chapter") ?? ""]
                    }
                    startingPage={startingPage}
                  />
                </TableOfContents>
                <Page size="LETTER"></Page>
                {data.items.map((project) => (
                  <ProjectView key={project.proid} project={project}>
                    <Footer
                      chapterTitle={
                        chapterTitles[searchParams.get("chapter") ?? ""]
                      }
                      startingPage={startingPage}
                    />
                  </ProjectView>
                ))}
              </Document>
            </TableOfContentsProvider>
          }
          fileName="project.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              <div
                style={{
                  background: "#999",
                  borderRadius: 8,
                  padding: "10px 15px",
                  fontFamily: "sans-serif",
                  color: "white",
                }}
              >
                Generating PDF
              </div>
            ) : error ? (
              <div
                style={{
                  background: "#999",
                  borderRadius: 8,
                  padding: "10px 15px",
                  fontFamily: "sans-serif",
                  color: "white",
                }}
              >
                Failed. Please refresh!
              </div>
            ) : (
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
            )
          }
        </PDFDownloadLink>
      ) : null}
    </>
  );
}
/**/
function Row({
  name,
  value,
  index,
  keyValuePairs,
  setKeyValuePairs,
}: {
  name: string;
  value?: string;
  index: number;
  keyValuePairs: KeyValuePair[];
  setKeyValuePairs: React.Dispatch<React.SetStateAction<KeyValuePair[]>>;
}) {
  function updateKey(el: React.ChangeEvent<HTMLInputElement>) {
    setKeyValuePairs(
      keyValuePairs.map((pair, i) => {
        if (index === i) return { ...pair, key: el.target.value };
        return pair;
      }),
    );
  }
  function updateValue(el: React.ChangeEvent<HTMLInputElement>) {
    setKeyValuePairs(
      keyValuePairs.map((pair, i) => {
        if (index === i) return { ...pair, value: el.target.value };
        return pair;
      }),
    );
  }
  function addKeyValuePair() {
    setKeyValuePairs([
      ...keyValuePairs.slice(0, index + 1),
      { key: "", value: "" },
      ...keyValuePairs.slice(index + 1),
    ]);
  }
  function removeKeyValuePair() {
    setKeyValuePairs(keyValuePairs.filter((_pair, i) => i !== index));
  }
  return (
    <div className="grid grid-cols-3 gap-2">
      <div>
        <input name="key" defaultValue={name} onChange={updateKey} />
      </div>
      <div>
        <input name="value" defaultValue={value} onChange={updateValue} />
      </div>
      <div>
        <input type="button" onClick={addKeyValuePair} value="Add" />{" "}
        <input type="button" onClick={removeKeyValuePair} value="Delete" />
      </div>
    </div>
  );
}
