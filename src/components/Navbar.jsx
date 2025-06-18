import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-blue-600 text-white">
      <Link to="/" className="font-bold">
        PneumoniaDetect
      </Link>
      <div className="flex gap-4">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login" className="bg-white text-blue-600 px-3 py-1 rounded">
          Login
        </Link>
      </div>
    </nav>
  );
}
