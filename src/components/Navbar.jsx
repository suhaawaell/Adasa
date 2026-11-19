import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">ع</span>
          عدسة
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>
            الرئيسية
          </NavLink>
          <NavLink to="/blog">المدونة</NavLink>
        </nav>
      </div>
    </header>
  );
}
