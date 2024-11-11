import { Font, StyleSheet } from "@react-pdf/renderer";

export const cssVars = {
  fontFamily: "Roboto",
};

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v19/KFOmCnqEu92Fr1Mu4mxPKTU1Kg.ttf",
});

Font.register({
  family: "Roboto-Bold",
  src: "https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOKCWcynf_cDxXwCLxiixG1c.ttf",
});

Font.register({
  family: "Roboto",
  fontStyle: "italic",
  src: "https://fonts.gstatic.com/s/roboto/v15/W4wDsBUluyw0tK3tykhXEfesZW2xOQ-xsNqO47m55DA.ttf",
});

const styles = StyleSheet.create({
  absolute: { position: "absolute" },
  "border-b": { borderBottom: "1px solid black" },
  "border-b-[3px]": { borderBottom: "3px solid black" },
  "border-black": { borderColor: "black" },
  "border-t": { borderTop: "1px solid black" },
  "border-y": { borderBottomStyle: "solid", borderTopStyle: "solid" },
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
  "leading-normal": { lineHeight: 1.5 },
  "m-2": { margin: 8 },
  "mb-2": { marginBottom: 8 },
  "ml-4": { marginBottom: 16 },
  "ml-8": { marginLeft: 32 },
  "mt-1": { marginTop: 4 },
  "mt-2": { marginTop: 8 },
  "my-2": { marginBottom: 8, marginTop: 8 },
  "p-2": { padding: 8 },
  "pb-2": { paddingBottom: 8 },
  "pl-2": { paddingLeft: 8 },
  "pr-8": { paddingRight: 32 },
  "pt-1": { paddingTop: 4 },
  "pt-2": { paddingTop: 8 },
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
    .forEach((className) => {
      if (className in styles) {
        style = { ...style, ...styles[className as keyof typeof styles] };
      } else {
        console.warn(`Missing class ${className}`);
      }
    });

  return style;
}
