/* eslint-disable react-hooks/static-components */
import * as runtime from "react/jsx-runtime";
import { createElement } from "react";
import { createHeadingSlugger, extractTextContent } from "@/lib/headings";
import CodeBlock from "@/components/CodeBlock";
import ArticleImage from "@/components/ArticleImage";
import { getArticleImageDescription } from "@/components/articleImageDescriptions";

function MDXImage({ alt, src, ...props }) {
  return createElement(ArticleImage, {
    ...props,
    src,
    alt: getArticleImageDescription(src, alt),
  });
}

const sharedComponents = {
  pre: CodeBlock,
  table: function MDXTable({ children, ...props }) {
    return (
      <div className="article-table-scroll" tabIndex={0} role="region" aria-label="표">
        <table {...props}>{children}</table>
      </div>
    );
  },
};

function useMDXComponent(code) {
  const fn = new Function(code);
  // Raw JSX <img> is compiled as an intrinsic tag, bypassing MDX's components.img.
  // Intercept both runtime entry points so Markdown and raw JSX share the same UI.
  const imageRuntime = (render) => (type, props, key) =>
    render(type === "img" ? MDXImage : type, props, key);
  return fn({
    ...runtime,
    jsx: imageRuntime(runtime.jsx),
    jsxs: imageRuntime(runtime.jsxs),
  }).default;
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
  const imageComponents = {
    img: MDXImage,
  };

  return (
    <Component
      components={{
        ...sharedComponents,
        ...headingComponents,
        ...imageComponents,
        ...components,
      }}
    />
  );
}
