import Html from "react-pdf-html";
import * as cheerio from "cheerio";
import { cssVars } from "./styles";

export default function parse(html: string) {
  const $ = cheerio.load(html);
  $("li p,div,span,table,tbody,thead,tr,th").map((_i, el) =>
    $(el).replaceWith(el.childNodes),
  );
  $("td").map((_i, el) => $(el).wrapInner("<p/>").children().first().unwrap());
  $("*").map((_i, el) => {
    $(el).removeAttr("class style dir");
    if ($(el).text().trim() === "") $(el).remove();
  });
  let cleanHtml = $.html().slice(12, -14).replace(/\r?\n/g, "");
  if (cleanHtml.indexOf("<") !== 0) cleanHtml = `<p>${cleanHtml}</p>`;
  return (
    <Html
      style={{
        fontFamily: cssVars.fontFamily,
        fontSize: 11,
      }}
    >
      {cleanHtml}
    </Html>
  );
}
