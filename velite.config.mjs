import { defineConfig, s } from "velite";

export default defineConfig({
  root: "posts",
  strict: true,
  collections: {
    posts: {
      name: "Post",
      pattern: "**/*.mdx",
      schema: s.object({
        title: s.string(),
        date: s.isodate(),
        updatedAt: s.isodate().optional(),
        description: s.string(),
        tags: s.array(s.string()).default([]),
        draft: s.boolean().default(false),
        slug: s.slug().optional(),
        legacySlugs: s.array(s.string()).default([]),
        path: s.path(),
        excerpt: s.excerpt({ length: 220 }),
        metadata: s.metadata(),
        code: s.mdx(),
      }),
    },
  },
});
