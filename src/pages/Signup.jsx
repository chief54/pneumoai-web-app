import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      signup(formData);
      navigate("/login");
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
          <h1 className="text-lg font-semibold text-ink mb-1">Create account</h1>
          <p className="text-[13px] text-ink-muted mb-5">Get started with PneumoAI in under a minute.</p>

          {error && (
            <p className="mb-4 text-danger bg-danger-bg border border-danger-border rounded-md p-2 text-sm">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Full name</label>
              <input
                type="text"
                name="name"
                placeholder="Full name"
                className="w-full px-2.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@clinic.com"
                className="w-full px-2.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full px-2.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Confirm password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                className="w-full px-2.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand hover:bg-brand-dark text-white py-2.5 rounded-md font-medium text-sm transition-colors"
            >
              Sign up
            </button>
          </form>
          <p className="mt-5 text-center text-[13px] text-ink-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-brand font-medium">
              Log in
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
