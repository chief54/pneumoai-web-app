import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-4 min-h-screen">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/overview" className="block hover:bg-gray-700 p-2 rounded">
            Overview
          </Link>
        </li>
        <li>
          <Link
            to="/patient-details"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Patient Records
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="block hover:bg-gray-700 p-2 rounded">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/reports" className="block hover:bg-gray-700 p-2 rounded">
            Reports
          </Link>
        </li>
      </ul>
    </div>
  );
}
