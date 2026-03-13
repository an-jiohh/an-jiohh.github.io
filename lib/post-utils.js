export const POSTS_PER_PAGE = 8;

export function formatDate(date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function getReadingTimeLabel(readingTime) {
  return readingTime ? `${readingTime} min read` : "Short read";
}

export function filterPosts(posts, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return posts;
  }

  return posts.filter((post) => {
    const haystack = [post.title, post.description, ...(post.tags || [])]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function sortPosts(posts, sort) {
  const direction = sort === "oldest" ? 1 : -1;

  return [...posts].sort((left, right) => {
    return (
      (new Date(left.lastModified || left.date).getTime() -
        new Date(right.lastModified || right.date).getTime()) *
      direction
    );
  });
}

export function clampPage(page, totalPages) {
  const safePage = Number.isFinite(page) ? page : 1;

  return Math.min(Math.max(safePage, 1), Math.max(totalPages, 1));
}
