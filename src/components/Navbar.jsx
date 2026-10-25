import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogoMark } from "./Logo";

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="flex flex-wrap gap-4 justify-between items-center px-6 sm:px-12 py-4 bg-deep border-b border-deep-line">
      <Link to="/" className="flex items-center gap-2">
        <LogoMark size={19} className="text-accent" />
        <span className="font-semibold text-[15px] text-deep-text tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          PneumoAI
        </span>
      </Link>
      <div className="flex gap-7 items-center flex-wrap text-sm font-medium text-deep-text-soft">
        <Link to="/about" className="hover:text-deep-text transition-colors">
          About
        </Link>
        <Link to="/contact" className="hover:text-deep-text transition-colors">
          Contact
        </Link>
        {isAuthenticated ? (
          <Link
            to="/overview"
            className="bg-accent hover:bg-accent-dark text-deep px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link to="/login" className="hover:text-deep-text transition-colors">
              Log in
            </Link>
            <Link
              to="/signup"
              className="bg-accent hover:bg-accent-dark text-deep px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Get started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
