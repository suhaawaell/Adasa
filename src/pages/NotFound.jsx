import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container not-found">
      <h1 className="accent">404</h1>
      <h2>عفواً! الصفحة غير موجودة</h2>
      <p className="muted">
        الصفحة التي تبحث عنها غير موجودة أو تم نقلها. دعنا نعيدك إلى المسار
        الصحيح.
      </p>
      <div className="not-found-actions">
        <Link to="/" className="btn">
          العودة للرئيسية
        </Link>
        <Link to="/blog" className="btn btn-outline">
          تصفح المقالات
        </Link>
      </div>
    </div>
  );
}
