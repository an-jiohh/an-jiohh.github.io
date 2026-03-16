/* eslint-disable react-hooks/static-components */
import * as runtime from "react/jsx-runtime";
import { createElement } from "react";
import { createHeadingSlugger, extractTextContent } from "@/lib/headings";

const sharedComponents = {};

function useMDXComponent(code) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export default function MDXContent({ code, components = {} }) {
  const headingSlugger = createHeadingSlugger();
  const createHeadingComponent = (tagName, className) => {
    return function Heading({ children, className: incomingClassName, ...props }) {
      const text = extractTextContent(children);
      const id = props.id || (text ? headingSlugger(text) : undefined);

      return createElement(
        tagName,
        {
          ...props,
          id,
          className: [className, incomingClassName].filter(Boolean).join(" "),
        },
        children
      );
    };
  };
  const Component = useMDXComponent(code);
  const headingComponents = {
    h2: createHeadingComponent("h2", "font-display"),
    h3: createHeadingComponent("h3", "font-display"),
    h4: createHeadingComponent("h4", "font-display"),
  };

  return (
    <Component
      components={{
        ...sharedComponents,
        ...headingComponents,
        ...components,
      }}
    />
  );
}
