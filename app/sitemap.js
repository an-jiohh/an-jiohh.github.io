import { allPosts } from "contentlayer/generated";

export default function sitemap() {
  const siteUrl = "https://an-jiohh.github.io";

  const postRoutes = allPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
  }));

  const staticRoutes = [
    "",
    "/blog",
    "/category",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...staticRoutes, ...postRoutes];
}
