import { Text, View } from "@react-pdf/renderer";
import Parse, { DOMNode, domToReact, Element } from "html-react-parser";
import { css } from "./styles";

export const defaultOptions = {
  trim: true,
  replace(domNode: DOMNode) {
    //Replace Elements with Text/View components
    if (domNode instanceof Element) {
      if (domNode.name === "p" || domNode.name === "span") {
        return (
          <View style={css`inline`}>
            {domNode.childNodes.map((node) => (
              <Text key={node.startIndex} style={css`mt-2`}>
                {domToReact([node as DOMNode], defaultOptions)}
              </Text>
            ))}
          </View>
        );
      }

      if (domNode.name === "li") {
        console.log(domNode.children);
        const children = domNode.children
          .map((child) =>
            child.type === "text" && child.data.trim()
              ? child
              : child.type === "tag"
                ? child
                : null,
          )
          .filter(Boolean);

        return (
          <View style={css`inline flex-nowrap`} wrap={false}>
            <Text>•</Text>
            <View wrap style={css`pl-2 inline`}>
              {domToReact(children as DOMNode[], defaultOptions)}
            </View>
          </View>
        );
      }

      if (domNode.name === "strong") {
        return (
          <Text style={css`font-bold`}>
            {domToReact(domNode.children as DOMNode[], defaultOptions)}
          </Text>
        );
      }

      if (domNode.name === "em") {
        return (
          <Text style={css`italic`}>
            {domToReact(domNode.children as DOMNode[], defaultOptions)}
          </Text>
        );
      }

      //remove unrendered nodes, returning only their children
      if (
        domNode.name === "a" ||
        domNode.name === "div" ||
        domNode.name === "ul" ||
        domNode.name === "ol" ||
        domNode.name === "br"
      ) {
        return domToReact(domNode.children as DOMNode[], defaultOptions);
      }

      if (domNode.name === "path") {
        const elm = domNode.cloneNode();
        domNode.tagName = "Path";
        return elm;
      }

      if (domNode.name === "rect") {
        const elm = domNode.cloneNode();
        domNode.tagName = "Rect";
        return elm;
      }

      //unmatched Element
      console.warn(`Unparsed element: ${domNode.name}`);
      return domNode;
    }
    //just a text node
    return domNode.data.trim() ? <Text>{domNode.data}</Text> : null;
  },
};

export default function parse(
  el: string,
  options: Partial<typeof defaultOptions> = defaultOptions,
) {
  return Parse(el, options);
}
