import { Page, Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import { TableOfContentsContext } from "src/utils/pageNumberProvider";
import { css, cssVars } from "src/utils/styles";

export default function TableOfContents({
  children,
  chapterNo,
  chapterTitle,
  keyValuePairs,
  startingPage,
}: {
  children: JSX.Element | JSX.Element[];
  chapterNo: string;
  chapterTitle: string;
  keyValuePairs: { key: string; value: string }[];
  startingPage: number;
}) {
  const { tableOfContents } = useContext(TableOfContentsContext);
  return (
    <Page
      wrap
      size="LETTER"
      style={{
        fontFamily: cssVars.fontFamily,
        fontSize: "12pt",
        paddingTop: "0.5in",
        paddingBottom: "0.6in",
        width: "auto",
        paddingLeft: "0.75in",
        paddingRight: "0.75in",
      }}
    >
      <View>
        <Text
          style={{
            marginTop: 16,
            fontSize: "13pt",
            fontFamily: "Calibri",
          }}
        >
          Delaware Valley Regional Planning Commission
        </Text>
        <Text
          style={{
            fontSize: "13pt",
            fontFamily: "Calibri",
          }}
        >
          Fiscal Year 2026 | Unified Planning Work Program
        </Text>
        <Text
          style={{
            marginTop: 16,
            fontSize: 24,
            fontFamily: "Calibri-Bold",
          }}
        >
          Table of Contents
        </Text>
        <Text
          style={{
            fontSize: 24,
            marginBottom: 16,
          }}
        >
          Chapter {chapterNo}: {chapterTitle}
        </Text>

        {tableOfContents.map(({ id, title, pageNumber }, index) => (
          <View
            key={index}
            style={[css`flex border-b border-[#7d7d7d] leading-none`]}
          >
            <Text
              style={{
                width: "15%",
                lineHeight: 1,
                marginTop: 2,
                marginBottom: -4,
              }}
            >
              {id}
            </Text>
            <Text
              style={{
                width: "80%",
                lineHeight: 1,
                marginTop: 2,
                marginBottom: -4,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                width: "5%",
                lineHeight: 1,
                marginTop: 2,
                marginBottom: -4,
                textAlign: "right",
              }}
            >
              {pageNumber + startingPage}
            </Text>
          </View>
        ))}
        {keyValuePairs.length && keyValuePairs[0].key.length ? (
          <>
            <Text
              style={{
                marginTop: 24,
                fontSize: 16,
                fontFamily: "Calibri-Bold",
              }}
            >
              Tables
            </Text>
            {keyValuePairs.map((pair: { key: string; value: string }) => (
              <View
                key={pair.key}
                style={css`flex border-b border-[#7d7d7d] leading-none mt-0.5`}
              >
                <Text style={{ width: "95%" }}>{pair.key}</Text>
                <Text style={{ width: "5%", textAlign: "right" }}>
                  {pair.value}
                </Text>
              </View>
            ))}
          </>
        ) : null}
      </View>
      {children}
    </Page>
  );
}
