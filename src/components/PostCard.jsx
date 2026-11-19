import { Link } from "react-router-dom";

export default function PostCard({ post, view = "grid" }) {
  return (
    <Link to={`/blog/${post.slug}`} className={`post-card ${view}`}>
      <div className="post-card-img">
        <img src={post.image} alt={post.title} />
        <span className="badge">{post.category}</span>
      </div>

      <div className="post-card-body">
        <h3>{post.title}</h3>
        <p className="muted">{post.excerpt}</p>

        <div className="post-meta">
          <img src={post.author.avatar} alt={post.author.name} />
          <span>{post.author.name}</span>
          <span className="dot">•</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
