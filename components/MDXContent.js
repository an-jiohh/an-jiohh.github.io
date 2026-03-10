/* eslint-disable react-hooks/static-components */
import * as runtime from "react/jsx-runtime";

const sharedComponents = {};

function useMDXComponent(code) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export default function MDXContent({ code, components = {} }) {
  const Component = useMDXComponent(code);
  return <Component components={{ ...sharedComponents, ...components }} />;
}
