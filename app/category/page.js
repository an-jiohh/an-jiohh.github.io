import CategoryGrid from "@/components/CategoryGrid";
import PageIntro from "@/components/PageIntro";
import { getAllTagEntries } from "@/lib/content";

export const metadata = {
  title: "Category",
  alternates: {
    canonical: "/category/",
  },
};

export default function Category() {
  const tags = getAllTagEntries();

  return (
    <div>
      <PageIntro
        title="카테고리"
        description="카테고리별로 묶인 글을 한눈에 보고, 관심 있는 카테고리로 바로 이동할 수 있습니다."
      />
      <section className="category-index" aria-label="카테고리 목록">
        <CategoryGrid tags={tags} />
      </section>
    </div>
  );
}
