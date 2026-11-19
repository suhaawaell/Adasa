import { Link, useParams } from "react-router-dom";
import data from "../data/data.json";
import PostCard from "../components/PostCard";
import NotFound from "./NotFound";

export default function BlogDetails() {
  const { slug } = useParams();
  const post = data.posts.find((p) => p.slug === slug);

  // wrong slug in the URL -> show the 404 page
  if (!post) {
    return <NotFound />;
  }

  // other posts from the same category
  const relatedPosts = data.posts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // the content is plain text: paragraphs are separated by an empty line,
  // and lines that start with "## " are headings
  const blocks = post.content.split("\n\n");

  const date = new Date(post.date).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="container section details">
      <div className="breadcrumb muted">
        <Link to="/">الرئيسية</Link> / <Link to="/blog">المدونة</Link> /{" "}
        <span>{post.title}</span>
      </div>

      <span className="badge static">{post.category}</span>
      <h1>{post.title}</h1>

      <div className="post-meta big">
        <img src={post.author.avatar} alt={post.author.name} />
        <div>
          <strong>{post.author.name}</strong>
          <p className="muted">{post.author.role}</p>
        </div>
        <span className="dot">•</span>
        <span className="muted">{date}</span>
        <span className="dot">•</span>
        <span className="muted">{post.readTime}</span>
      </div>

      <img className="details-cover" src={post.image} alt={post.title} />

      <div className="details-content">
        {blocks.map((block, index) =>
          block.startsWith("## ") ? (
            <h2 key={index}>{block.replace("## ", "")}</h2>
          ) : (
            <p key={index}>{block}</p>
          )
        )}
      </div>

      <div className="tags">
        <h4>الوسوم:</h4>
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      {relatedPosts.length > 0 && (
        <section className="section">
          <div className="section-title">
            <h2>مقالات قد تعجبك</h2>
          </div>
          <div className="posts-grid">
            {relatedPosts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
