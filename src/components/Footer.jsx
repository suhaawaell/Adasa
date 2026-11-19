import { Link } from "react-router-dom";
import data from "../data/data.json";

export default function Footer() {
  const { siteInfo, categories } = data;

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="logo">
            <span className="logo-icon">ع</span>
            {siteInfo.name}
          </Link>
          <p className="muted">{siteInfo.description}</p>
        </div>

        <div>
          <h4>روابط</h4>
          <Link to="/">الرئيسية</Link>
          <Link to="/blog">المدونة</Link>
        </div>

        <div>
          <h4>التصنيفات</h4>
          {categories.map((cat) => (
            <Link key={cat.name} to={`/blog?category=${cat.name}`}>
              {cat.name}
            </Link>
          ))}
        </div>

        <div>
          <h4>تواصل معنا</h4>
          <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
          <a href={siteInfo.social.twitter} target="_blank" rel="noreferrer">
            Twitter
          </a>
          <a href={siteInfo.social.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>

      <p className="copyright">
        © {new Date().getFullYear()} {siteInfo.name}. جميع الحقوق محفوظة.
      </p>
    </footer>
  );
}
