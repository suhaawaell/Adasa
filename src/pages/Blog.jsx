import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import data from "../data/data.json";
import PostCard from "../components/PostCard";

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const { posts, categories } = data;

  // category is saved in the URL (/blog?category=...) so links from other pages work
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";

  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // 1) filter by category and search text
  const filteredPosts = posts.filter((post) => {
    const matchCategory = category === "all" || post.category === category;
    const matchSearch =
      post.title.includes(search) || post.excerpt.includes(search);
    return matchCategory && matchSearch;
  });

  // 2) pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
    setCurrentPage(1);
  }

  function handleCategory(e) {
    const value = e.target.value;
    if (value === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
    setCurrentPage(1);
  }

  function goToPage(page) {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }

  return (
    <div className="container section">
      <div className="page-header">
        <h1>مقالاتنا</h1>
        <p className="muted">
          اكتشف الدروس والرؤى وأفضل الممارسات في عالم التصوير
        </p>
      </div>

      {/* Toolbar: search + category + view */}
      <div className="toolbar">
        <input
          type="text"
          className="input"
          placeholder="ابحث عن مقال..."
          value={search}
          onChange={handleSearch}
        />

        <select className="input" value={category} onChange={handleCategory}>
          <option value="all">جميع المقالات</option>
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="view-buttons">
          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          >
            شبكة
          </button>
          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
          >
            قائمة
          </button>
        </div>
      </div>

      <p className="muted results-count">
        عدد النتائج: {filteredPosts.length}
      </p>

      {/* Posts */}
      {pagePosts.length === 0 ? (
        <div className="empty">
          <h3>لا توجد مقالات</h3>
          <p className="muted">
            حاول تعديل البحث أو الفلتر للعثور على ما تبحث عنه.
          </p>
        </div>
      ) : (
        <div className={view === "grid" ? "posts-grid" : "posts-list"}>
          {pagePosts.map((post) => (
            <PostCard key={post.id} post={post} view={view} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            السابق
          </button>

          {pages.map((page) => (
            <button
              key={page}
              className={page === currentPage ? "active" : ""}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
}
