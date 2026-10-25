import { useMemo } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { getHistory } from "../lib/history";

const R = 62;
const CIRCUMFERENCE = 2 * Math.PI * R;

export default function Overview() {
  const { user } = useAuth();
  const history = useMemo(() => getHistory(), []);

  const total = history.length;
  const pneumoniaCount = history.filter((h) => h.prediction === "Pneumonia").length;
  const normalCount = total - pneumoniaCount;
  const recent = history.slice(0, 6);

  const normalPct = total ? Math.round((normalCount / total) * 100) : 0;
  const pneumoniaPct = total ? 100 - normalPct : 0;
  const normalLen = total ? (normalCount / total) * CIRCUMFERENCE : 0;

  const initials = (user?.name || "D R")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex min-h-screen bg-app">
      <Sidebar />
      <div className="flex-1 min-w-0 p-9">
        {/* Topbar */}
        <div className="flex flex-wrap gap-3.5 justify-between items-center mb-6">
          <div>
            <h1 className="text-lg font-semibold text-ink">Overview</h1>
            <p className="text-[13.5px] text-ink-muted mt-0.5">
              Welcome back{user ? `, ${user.name}` : ""}.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-1.5 bg-white border border-line rounded-md px-3 py-1.5 text-ink-faint">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
              </svg>
              <span className="text-[13px]">Search patients…</span>
            </div>
            <div className="w-8 h-8 rounded-md bg-brand text-white flex items-center justify-center font-semibold text-xs">
              {initials}
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border border-line rounded-lg overflow-hidden mb-5">
          <div className="bg-white p-4">
            <p className="text-xs text-ink-muted mb-1.5">Total scans</p>
            <p className="text-[22px] font-bold text-ink">{total}</p>
          </div>
          <div className="bg-white p-4">
            <p className="text-xs text-ink-muted mb-1.5">Pneumonia detected</p>
            <p className="text-[22px] font-bold text-danger">{pneumoniaCount}</p>
          </div>
          <div className="bg-white p-4">
            <p className="text-xs text-ink-muted mb-1.5">Normal</p>
            <p className="text-[22px] font-bold text-success">{normalCount}</p>
          </div>
          <div className="bg-white p-4">
            <p className="text-xs text-ink-muted mb-1.5">Patients tracked</p>
            <p className="text-[22px] font-bold text-ink">{new Set(history.map((h) => h.patientId).filter(Boolean)).size}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4.5">
          {/* Recent scans */}
          <div className="bg-white border border-line rounded-lg p-5">
            <div className="flex justify-between items-center mb-1.5">
              <h2 className="text-sm font-semibold text-ink">Recent scans</h2>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 bg-brand hover:bg-brand-dark text-white px-3.5 py-2 rounded-md text-[13px] font-medium transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                New analysis
              </Link>
            </div>

            {recent.length === 0 ? (
              <p className="text-ink-faint text-sm py-6 text-center">No scans yet. Head to New analysis to screen an X-ray.</p>
            ) : (
              recent.map((scan) => (
                <div key={scan.id} className="flex items-center gap-3 py-2.5 border-t border-line-soft">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      scan.prediction === "Pneumonia" ? "bg-danger" : "bg-success"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-medium text-ink truncate">{scan.patientName}</p>
                    <p className="text-[11.5px] text-ink-faint mt-0.5">
                      {new Date(scan.date).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      scan.prediction === "Pneumonia" ? "text-danger" : "text-success"
                    }`}
                  >
                    {scan.prediction} · {(scan.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Outcomes donut */}
          <div className="bg-white border border-line rounded-lg p-5 flex flex-col items-center">
            <h2 className="text-sm font-semibold text-ink self-start mb-3.5">Scan outcomes</h2>
            <svg viewBox="0 0 160 160" className="w-[140px] h-[140px]">
              <circle cx="80" cy="80" r={R} fill="none" stroke="#F3F4F6" strokeWidth="16" />
              {total > 0 && (
                <>
                  <circle
                    cx="80" cy="80" r={R} fill="none" stroke="#027A48" strokeWidth="16"
                    strokeDasharray={`${normalLen} ${CIRCUMFERENCE}`}
                    transform="rotate(-90 80 80)"
                  />
                  <circle
                    cx="80" cy="80" r={R} fill="none" stroke="#B42318" strokeWidth="16"
                    strokeDasharray={`${CIRCUMFERENCE - normalLen} ${CIRCUMFERENCE}`}
                    strokeDashoffset={-normalLen}
                    transform="rotate(-90 80 80)"
                  />
                </>
              )}
              <text x="80" y="76" textAnchor="middle" fontSize="22" fontWeight="700" fill="#111827">{total}</text>
              <text x="80" y="94" textAnchor="middle" fontSize="10.5" fill="#9CA3AF">total scans</text>
            </svg>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-success" />
                <span className="text-xs text-ink-soft">Normal {normalPct}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-danger" />
                <span className="text-xs text-ink-soft">Pneumonia {pneumoniaPct}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
