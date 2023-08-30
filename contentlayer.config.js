import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  contentType: "mdx",
  filePathPattern: `**/*.mdx`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "string", required: true },
    description: { type: "string", required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
  },
  computedFields:{
    slug:{
      type: 'string',
      // resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
      resolve: (doc) => doc._raw.flattenedPath.replace(/\//g, ''),
    }
  }
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
});
