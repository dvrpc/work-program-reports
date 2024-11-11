import { Text } from "@react-pdf/renderer";
import { css } from "../utils/styles";
import DvrpcLogo from "./DvrpcLogo";

export default function Footer({
  startingPage = 1,
}: {
  startingPage?: number;
}) {
  return (
    <>
      <DvrpcLogo
        fixed
        style={[
          css`absolute bottom-0 pt-2 border-t border-black`,
          {
            height: 38,
            left: "0.5in",
            right: "0.5in",
          },
        ]}
      />
      <Text
        fixed
        style={[
          css`absolute bottom-0 text-right`,
          {
            height: 30,
            left: "0.5in",
            right: "0.5in",
          },
        ]}
        render={({ pageNumber }) => `Page ${pageNumber + startingPage - 1}`}
      />
    </>
  );
}
