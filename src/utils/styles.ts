import { Font, StyleSheet } from "@react-pdf/renderer";
import fontUrl from "src/images/calibri.ttf";
import fontBoldUrl from "src/images/calibrib.ttf";

export const cssVars = {
  fontFamily: "Calibri",
};

Font.registerHyphenationCallback((word) => {
  // Return the entire word as a single part
  return [word];
});

Font.register({
  family: "Calibri",
  src: fontUrl,
});

Font.register({
  family: "Calibri-Bold",
  src: fontBoldUrl,
});

Font.register({
  family: "Calibri",
  fontStyle: "italic",
  src: fontUrl,
});

const styles = StyleSheet.create({
  absolute: { position: "absolute" },
  "border-b": { borderBottom: "1pt solid black" },
  "border-b-[2px]": { borderBottom: "2px solid black" },
  "border-black": { borderColor: "black" },
  "border-[#7d7d7d]": { borderColor: "#7d7d7d" },
  "border-t": { borderTop: "0.5px solid black" },
  "border-y": {
    borderTop: "0.5px solid black",
    borderBottom: "0.5px solid black",
  },
  "border-y-2": { borderBottomWidth: 2, borderTopWidth: 2 },
  "bg-yellow-500": { backgroundColor: "#EAB308" },
  "bottom-0": { bottom: 0 },
  flex: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
  "flex-nowrap": { flexWrap: "nowrap" },
  "font-bold": { fontFamily: `${cssVars.fontFamily}-Bold`, fontWeight: 700 },
  inline: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  italic: { fontStyle: "italic" },
  "leading-none": { lineHeight: 1 },
  "leading-normal": { lineHeight: 1.5 },
  "m-2": { margin: 8 },
  "mb-0.5": { marginBottom: 2 },
  "mb-2": { marginBottom: 8 },
  "ml-4": { marginBottom: 16 },
  "ml-8": { marginLeft: 32 },
  "mt-0.5": { marginTop: 2 },
  "mt-1": { marginTop: 4 },
  "mt-2": { marginTop: 8 },
  "my-2": { marginBottom: 8, marginTop: 8 },
  "p-2": { padding: 8 },
  "pb-1": { paddingBottom: 4 },
  "pb-2": { paddingBottom: 8 },
  "pl-2": { paddingLeft: 8 },
  "pr-8": { paddingRight: 32 },
  "pt-1": { paddingTop: 4 },
  "pt-2": { paddingTop: 8 },
  "right-0": { right: 0 },
  "text-base": { fontSize: "11pt" },
  "text-center": { textAlign: "center" },
  "text-lg": { fontSize: "12pt" },
  "text-right": { textAlign: "right" },
  "text-xl": { fontSize: "14pt" },
  underline: { textDecoration: "underline" },
  "w-full": { width: "100%" },
});

export function css(strings: TemplateStringsArray): object {
  let style = {};

  strings
    .join(" ")
    .split(" ")
    .filter(Boolean)
    .forEach((className) => {
      if (className in styles) {
        style = { ...style, ...styles[className as keyof typeof styles] };
      } else {
        console.warn(`Missing class ${className}`);
      }
    });

  return style;
}
