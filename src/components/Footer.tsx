import { Text, View } from "@react-pdf/renderer";
import { css } from "../utils/styles";
import DvrpcLogo from "./DvrpcLogo";

export default function Footer({
  startingPage = 1,
  chapterTitle = "",
}: {
  startingPage?: number;
  chapterTitle?: string;
}) {
  return (
    <View
      fixed
      style={[
        css`absolute bottom-0`,
        {
          height: 38,
          left: 0,
          right: 0,
        },
      ]}
      render={({ pageNumber }) => {
        return (pageNumber + startingPage - 1) % 2 ? (
          <>
            <DvrpcLogo
              style={[
                css`absolute bottom-0 pt-2`,
                {
                  height: 38,
                  width: 59,
                  left: "0.75in",
                },
              ]}
            />
            <Text
              style={[
                css`absolute bottom-0 border-t border-black pt-2 text-right`,
                {
                  height: 38,
                  left: "0.75in",
                  right: "0.75in",
                },
              ]}
            >
              {chapterTitle} | {pageNumber + startingPage - 1}
            </Text>
          </>
        ) : (
          <>
            <Text
              style={[
                css`absolute bottom-0 border-t border-black pt-2`,
                {
                  height: 38,
                  left: "0.75in",
                  right: "0.75in",
                },
              ]}
            >
              {pageNumber + startingPage - 1} | {chapterTitle}
            </Text>
            <DvrpcLogo
              style={[
                css`absolute bottom-0 pt-2`,
                {
                  height: 38,
                  width: 59,
                  right: "0.75in",
                },
              ]}
            />
          </>
        );
      }}
    ></View>
  );
}
