import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="font-serif text-6xl font-bold text-navy mb-4">404</h1>
      <h2 className="font-serif text-2xl font-semibold text-ink mb-2">Page Not Found</h2>
      <p className="text-muted mb-8 max-w-sm mx-auto">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navyHover transition-colors">
        Go to Dashboard
      </Link>
    </div>
  );
}