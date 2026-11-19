import { Link } from "react-router-dom";
import data from "../data/data.json";
import PostCard from "../components/PostCard";

export default function Home() {
  const { posts, categories, siteInfo } = data;

  const featuredPosts = posts.filter((post) => post.featured);

  // newest posts first, then take the first 3
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <span className="pill">{siteInfo.tagline}</span>
          <h1>
            اكتشف <span className="accent">فن</span> التصوير الفوتوغرافي
          </h1>
          <p>انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير.</p>
          <Link to="/blog" className="btn">
            استكشف المقالات
          </Link>
        </div>
      </section>

      {/* Featured posts */}
      <section className="section container">
        <div className="section-title">
          <h2>مقالات مختارة</h2>
          <p className="muted">محتوى منتقى لبدء رحلة تعلمك</p>
        </div>
        <div className="posts-grid">
          {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section container">
        <div className="section-title">
          <h2>استكشف حسب الموضوع</h2>
          <p className="muted">اعثر على محتوى مصمم حسب اهتماماتك</p>
        </div>
        <div className="categories">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/blog?category=${cat.name}`}
              className="category-card"
            >
              <h3>{cat.name}</h3>
              <span className="muted">
                {posts.filter((p) => p.category === cat.name).length} مقالات
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest posts */}
      <section className="section container">
        <div className="section-title">
          <h2>أحدث المقالات</h2>
          <p className="muted">محتوى جديد طازج من المطبعة</p>
        </div>
        <div className="posts-grid">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="center">
          <Link to="/blog" className="btn btn-outline">
            عرض جميع المقالات
          </Link>
        </div>
      </section>
    </>
  );
}
