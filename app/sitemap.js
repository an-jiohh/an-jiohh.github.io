import { getAllPosts, getAllTags, getTagPath } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/** @returns {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const posts = getAllPosts();
  const tags = getAllTags();

  const postRoutes = posts.map((post) => ({
    url: `${SITE_URL}${post.canonicalPath}`,
    lastModified: new Date(post.lastModified),
  }));

  const tagRoutes = tags.map((tag) => ({
    url: `${SITE_URL}${getTagPath(tag)}`,
    lastModified: new Date(),
  }));

  const staticRoutes = ["/", "/blog/", "/category/"].map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...tagRoutes, ...postRoutes];
}
