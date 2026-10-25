import { useMemo } from "react";
import Sidebar from "../components/Sidebar";
import { getHistory, clearHistory } from "../lib/history";

function downloadCsv(history) {
  const header = "Patient,File,Result,Confidence,Date\n";
  const rows = history
    .map(
      (s) =>
        `${s.patientName},${s.fileName},${s.prediction},${(s.confidence * 100).toFixed(1)}%,${s.date}`
    )
    .join("\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pneumoai_report.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function Reports() {
  const history = useMemo(() => getHistory(), []);

  const total = history.length;
  const pneumoniaCount = history.filter((h) => h.prediction === "Pneumonia").length;
  const avgConfidence =
    total === 0 ? 0 : (history.reduce((sum, h) => sum + h.confidence, 0) / total) * 100;

  return (
    <div className="flex min-h-screen bg-app">
      <Sidebar />
      <div className="flex-1 min-w-0 p-9">
        <h1 className="text-lg font-semibold text-ink mb-5">Reports</h1>

        {total === 0 ? (
          <div className="bg-white border border-line rounded-lg p-8 text-ink-faint text-center text-sm">
            System reports will appear here once scans have been analyzed.
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line border border-line rounded-lg overflow-hidden">
              <div className="bg-white p-4">
                <p className="text-xs text-ink-muted mb-1.5">Total scans</p>
                <p className="text-xl font-bold text-ink">{total}</p>
              </div>
              <div className="bg-white p-4">
                <p className="text-xs text-ink-muted mb-1.5">Pneumonia rate</p>
                <p className="text-xl font-bold text-ink">{((pneumoniaCount / total) * 100).toFixed(1)}%</p>
              </div>
              <div className="bg-white p-4">
                <p className="text-xs text-ink-muted mb-1.5">Avg. confidence</p>
                <p className="text-xl font-bold text-ink">{avgConfidence.toFixed(1)}%</p>
              </div>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => downloadCsv(history)}
                className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Export CSV
              </button>
              <button
                onClick={() => {
                  clearHistory();
                  window.location.reload();
                }}
                className="bg-white border border-gray-300 hover:bg-app text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Clear history
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
