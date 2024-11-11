import { Svg, Text, View } from "@react-pdf/renderer";
import SVG_1a from "src/images/1a.svg?raw";
import SVG_1b from "src/images/1b.svg?raw";
import SVG_1c from "src/images/1c.svg?raw";
import SVG_1d from "src/images/1d.svg?raw";
import SVG_1e from "src/images/1e.svg?raw";
import SVG_2a from "src/images/2a.svg?raw";
import SVG_2b from "src/images/2b.svg?raw";
import SVG_2c from "src/images/2c.svg?raw";
import SVG_2d from "src/images/2d.svg?raw";
import SVG_2e from "src/images/2e.svg?raw";
import SVG_3a from "src/images/3a.svg?raw";
import SVG_3b from "src/images/3b.svg?raw";
import SVG_3c from "src/images/3c.svg?raw";
import SVG_3d from "src/images/3d.svg?raw";
import SVG_3e from "src/images/3e.svg?raw";
import SVG_4a from "src/images/4a.svg?raw";
import SVG_4b from "src/images/4b.svg?raw";
import SVG_4c from "src/images/4c.svg?raw";
import SVG_4d from "src/images/4d.svg?raw";
import SVG_4e from "src/images/4e.svg?raw";
import {
  type Project,
  type FundingDetails,
  type LRPImages,
  type Amendment,
  HighlightFund,
} from "src/Project";
import parse from "src/utils/parse";
import { css } from "src/utils/styles";

const images: Record<string, string> = {
  "1a": SVG_1a,
  "1b": SVG_1b,
  "1c": SVG_1c,
  "1d": SVG_1d,
  "1e": SVG_1e,
  "2a": SVG_2a,
  "2b": SVG_2b,
  "2c": SVG_2c,
  "2d": SVG_2d,
  "2e": SVG_2e,
  "3a": SVG_3a,
  "3b": SVG_3b,
  "3c": SVG_3c,
  "3d": SVG_3d,
  "3e": SVG_3e,
  "4a": SVG_4a,
  "4b": SVG_4b,
  "4c": SVG_4c,
  "4d": SVG_4d,
  "4e": SVG_4e,
};

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function ProjectView({
  pageBreak = false,
  project,
}: {
  pageBreak?: boolean;
  project: Project | Amendment;
}) {
  return (
    <View break={pageBreak}>
      <View>
        <View style={css`border-b-[3px] border-black font-bold flex w-full`}>
          <Text style={{ width: "25%" }}>PROJECT: {project.proid}</Text>
          <Text style={{ width: "75%" }}>{project.proname}</Text>
        </View>
        <View style={css`flex w-full`}>
          <Text style={{ width: "25%" }}>Responsible Agency:</Text>
          <Text style={{ width: "75%" }}>{project.respagency}</Text>
        </View>
        <View style={css`flex w-full`}>
          <Text style={{ width: "25%" }}>Program Coordinator:</Text>
          <Text style={{ width: "75%" }}>{project.coordinator}</Text>
        </View>
        <View style={css`flex w-full`}>
          <Text style={{ width: "25%" }}>Project Manager(s):</Text>
          <Text style={{ width: "75%" }}>{project.managers}</Text>
        </View>
        {project.lrpimages && (
          <View style={css`flex w-full`}>
            <Text style={{ width: "25%" }}>Supports LRP Goals:</Text>
            <View style={{ width: "75%" }}>
              <Text style={css`flex`}>
                {Object.values(
                  (JSON.parse(project.lrpimages) as LRPImages[])[0],
                ).map((image: string | null) =>
                  image && image.split(".")[0] in images ? (
                    <Svg width={21} height={21} key={image}>
                      {parse(images[image.split(".")[0]])}
                    </Svg>
                  ) : null,
                )}
              </Text>
            </View>
          </View>
        )}
      </View>
      <Text style={css`my-2 font-bold underline`}>Goals:</Text>
      {parse(project.goals ?? "")}
      <Text style={css`my-2 font-bold underline`}>Description:</Text>
      {parse(project.description ?? "")}
      <Text style={css`my-2 font-bold underline`}>Tasks:</Text>
      {parse(project.tasks ?? "")}
      <Text style={css`my-2 font-bold underline`}>Products:</Text>
      {parse(project.products ?? "")}
      <Text style={css`my-2 font-bold underline`}>Beneficiaries:</Text>
      {parse(project.beneficiaries ?? "")}
      <View wrap={false}>
        <Text style={css`my-2 font-bold underline`}>
          Project Cost and Funding:
        </Text>
        <View style={css`border-y-2 border-black w-full`}>
          <View style={css`border-y border-black flex`}>
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
                    ? css`border-y border-black bg-yellow-500 flex mt-1`
                    : css`border-y border-black flex pt-1`
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
            <Text>Other Funding Details:</Text>
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
  );
}
