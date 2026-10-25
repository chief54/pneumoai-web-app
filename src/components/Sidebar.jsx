import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogoMark } from "./Logo";

const LINKS = [
  {
    to: "/overview",
    label: "Overview",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
  {
    to: "/patient-details",
    label: "Patient records",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    to: "/dashboard",
    label: "New analysis",
    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  },
  {
    to: "/reports",
    label: "Reports",
    icon: (
      <>
        <path d="M3 3v18h18" />
        <rect x="7" y="13" width="3" height="5" rx="1" />
        <rect x="12" y="9" width="3" height="9" rx="1" />
        <rect x="17" y="5" width="3" height="13" rx="1" />
      </>
    ),
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = (user?.name || "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-60 bg-sidebar min-h-screen flex flex-col justify-between p-3.5 shrink-0">
      <div>
        <div className="flex items-center gap-2 px-2 pt-1 pb-5">
          <LogoMark size={18} className="text-blue-400" />
          <span className="font-bold text-sm text-gray-50 tracking-tight">PneumoAI</span>
        </div>

        <p className="text-[10.5px] font-semibold tracking-wider text-gray-600 uppercase px-3 mb-2">
          Workspace
        </p>

        <ul className="space-y-px">
          {LINKS.map((link) => {
            const active = location.pathname === link.to;
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`flex items-center gap-2.5 pl-3 pr-2.5 py-1.5 rounded-md text-[13px] font-medium border-l-2 transition-colors ${
                    active
                      ? "bg-sidebar-active text-gray-50 border-blue-500"
                      : "text-gray-400 border-transparent hover:text-gray-200"
                  }`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0"
                  >
                    {link.icon}
                  </svg>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-gray-800 pt-3.5">
        <div className="flex items-center gap-2.5 px-1.5 pb-3">
          <div className="w-7 h-7 rounded-md bg-sidebar-active text-gray-300 flex items-center justify-center text-[11.5px] font-semibold shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-[12.5px] font-medium text-gray-200 truncate">
              {user?.name || "Signed out"}
            </p>
            <p className="text-[11px] text-gray-500">Clinician</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 pl-3 pr-2.5 py-1.5 rounded-md text-[13px] font-medium text-gray-400 hover:text-gray-200 text-left"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="M16 17l5-5-5-5" />
            <path d="M21 12H9" />
          </svg>
          Log out
        </button>
      </div>
    </div>
  );
}
