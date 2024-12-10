import {
  Document,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from "@react-pdf/renderer";
import { useState } from "react";
import { Form, useSearchParams } from "react-router-dom";
import Footer from "src/components/Footer";
import { css, cssVars } from "src/utils/styles";

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
        <input
          name="value"
          defaultValue={value}
          onChange={updateValue}
          required
        />
      </div>
      <div>
        <input type="button" onClick={addKeyValuePair} value="Add" />{" "}
        <input type="button" onClick={removeKeyValuePair} value="Delete" />
      </div>
    </div>
  );
}
interface KeyValuePair {
  key: string;
  value: string;
}
export default function TocRoute() {
  const [searchParams] = useSearchParams();
  const [keyValuePairs, setKeyValuePairs] = useState<KeyValuePair[]>([
    { key: "", value: "" },
  ]);
  console.log(keyValuePairs);
  return (
    <>
      <Form>
        <div className="grid grid-cols-3 gap-2">
          <div>Section Title</div>
          <div>Page Number</div>
        </div>
        {keyValuePairs.map((pair, index) => (
          <Row
            key={pair.key}
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
      {searchParams.get("action") &&
      searchParams.get("key") &&
      searchParams.get("value") ? (
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
                  paddingTop: "0.5in",
                  paddingBottom: "0.6in",
                  width: "auto",
                }}
              >
                <Text style={css`text-xl text-center`}>
                  FY2026 Work Program
                </Text>
                <View style={{ marginHorizontal: "0.5in" }}>
                  <Text
                    style={{
                      marginTop: 128,
                      fontSize: 24,
                      fontFamily: "Calibri-Bold",
                    }}
                  >
                    Table of Contents
                  </Text>
                  <Text
                    style={{
                      fontSize: 24,
                    }}
                  >
                    Chapter {chapter}
                  </Text>
                  {keyValuePairs.map((pair) => (
                    <View
                      key={pair.key}
                      style={css`flex border-b border-black my-4`}
                    >
                      <Text style={{ width: "95%" }}>{pair.key}</Text>
                      <Text style={{ textAlign: "right" }}>{pair.value}</Text>
                    </View>
                  ))}
                </View>
                <Text style={[{ marginTop: 256 }, css`text-center`]}>
                  DELAWARE VALLEY REGIONAL PLANNING COMMISSION
                </Text>
                <Text style={css`text-center`}>
                  190 N. Independence Mall West, 8th Fl
                </Text>
                <Text style={css`text-center`}>
                  Philadelphia, PA 19106-1520
                </Text>
                <Text style={css`text-center`}>
                  Phone (215) 592-1800 - Main Office
                </Text>
                <Footer />
              </Page>
            </Document>
          }
          fileName="toc.pdf"
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
