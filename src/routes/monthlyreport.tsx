import {
  Document,
  Page,
  PDFDownloadLink,
  Text,
  View,
} from "@react-pdf/renderer";
import { css, cssVars } from "../utils/styles";
import MonthlyReport, { MonthlyReportProps } from "../components/MonthlyReport";
import Footer from "../components/Footer";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";

interface JSONType {
  items?: MonthlyReportProps[];
}

export function MonthlyReportLoader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const monthStart = url.searchParams.get("month") ?? "";

  return fetch(
    `https://apps.dvrpc.org/ords/workprogram${params.yr}/workprogram/monthlyReports?repMonth=${monthStart}`,
    { signal: request.signal },
  );
}

export default function MonthlyReportRoute() {
  const data = useLoaderData() as JSONType | undefined;
  const [searchParams] = useSearchParams();
  const monthStart = searchParams.get("month") ?? "";

  const month = new Date(monthStart).toLocaleDateString("en-us", {
    month: "long",
  });
  const year = new Date(monthStart).toLocaleDateString("en-us", {
    year: "numeric",
  });
  return (
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
            size="LETTER"
            style={{
              fontFamily: cssVars.fontFamily,
              fontSize: "11pt",
              paddingHorizontal: "0.5in",
              paddingVertical: "0.5in",
              width: "auto",
              lineHeight: 1.5,
            }}
          >
            <Text style={css`text-xl text-center`}>
              FY2025 Work Program {month} Progress Report ( PA / NJ / Other )
            </Text>
            <View style={{ marginHorizontal: "0.5in" }}>
              <Text style={{ marginTop: 128 }}>Content:</Text>
              <Text style={css`ml-8`}>
                I. Narrative Statement of DVRPC’s Regular Program
              </Text>
              <Text>
                II. Table 1: Project Status Report: (DVRPC’s Regular Program)
              </Text>
              <Text>III. Table 2: Project Status Report for</Text>
              <Text style={css`ml-8`}>a. New Jersey Local Scoping Program</Text>
              <Text style={css`ml-8`}>
                b. PA/NJ Transportation Community Development Initiative (TCDI)
              </Text>
              <Text>IV. Table 3: Project Status Report for</Text>
              <Text style={css`ml-8`}>
                a. Supportive Regional Highway Planning Program
              </Text>
              <Text style={css`ml-8`}>
                b. PA/NJ Regional GIS Implementation
              </Text>
              <Text style={css`ml-8`}>c. Transit Support Program</Text>
            </View>
            <Text style={[{ marginTop: 256 }, css`text-center`]}>
              DELAWARE VALLEY REGIONAL PLANNING COMMISSION
            </Text>
            <Text style={css`text-center`}>
              190 N. Independence Mall West, 8th Fl
            </Text>
            <Text style={css`text-center`}>Philadelphia, PA 19106-1520</Text>
            <Text style={css`text-center`}>
              Phone (215) 592-1800 - Main Office
            </Text>
            <Footer />
          </Page>
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
            {data?.items?.map((item) => (
              <MonthlyReport
                month={month}
                year={year}
                {...item}
                key={item.proid}
              />
            ))}
            <Footer />
          </Page>
        </Document>
      }
      fileName="monthlyreport.pdf"
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
        Download {month} report
      </div>
    </PDFDownloadLink>
  );
}
