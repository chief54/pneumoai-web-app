import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      login({ email, password });
      navigate("/overview");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-10 bg-app">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2 mb-7">
          <Logo size={18} />
        </Link>

        <div className="bg-white border border-line rounded-lg p-7 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
          <h1 className="text-lg font-semibold text-ink mb-1">Log in</h1>
          <p className="text-[13px] text-ink-muted mb-5">Enter your details to access your dashboard.</p>

          {error && (
            <p className="mb-4 text-danger bg-danger-bg border border-danger-border rounded-md p-2 text-sm">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@clinic.com"
                className="w-full px-2.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-2.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand hover:bg-brand-dark text-white py-2.5 rounded-md font-medium text-sm transition-colors"
            >
              Log in
            </button>
          </form>
          <p className="mt-5 text-center text-[13px] text-ink-muted">
            Don't have an account?{" "}
            <Link to="/signup" className="text-brand font-medium">
              Sign up
            </Link>
          </p>
        </div>

        <p className="mt-4 text-center text-[11.5px] text-ink-faint">
          Educational project, not a certified diagnostic tool.
        </p>
      </div>
    </div>
  );
}
