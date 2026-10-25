import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { analyzeXray } from "../lib/api";
import { addScanRecord } from "../lib/history";
import { getPatients, addPatient } from "../lib/patients";

export default function Dashboard() {
  const [patients, setPatients] = useState(() => getPatients());
  const [patientId, setPatientId] = useState("");
  const [showNewPatient, setShowNewPatient] = useState(false);
  const [newPatientName, setNewPatientName] = useState("");

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setResult(null);
    setError("");
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleAddPatient = () => {
    if (!newPatientName.trim()) return;
    const patient = addPatient({ name: newPatientName.trim() });
    const updated = getPatients();
    setPatients(updated);
    setPatientId(patient.id);
    setNewPatientName("");
    setShowNewPatient(false);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a chest X-ray image first.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await analyzeXray(file);
      if (data.status !== "success") {
        throw new Error(data.detail || data.error || "Analysis failed.");
      }
      setResult(data);

      const patient = patients.find((p) => p.id === patientId);
      addScanRecord({
        patientId: patient?.id || null,
        patientName: patient?.name || "Unassigned",
        prediction: data.prediction,
        confidence: data.confidence,
        fileName: file.name,
      });
    } catch (err) {
      setError(err.message || "Could not reach the analysis server.");
    } finally {
      setLoading(false);
    }
  };

  const confidencePct = result ? (result.confidence * 100).toFixed(1) : null;
  const isPneumonia = result?.prediction === "Pneumonia";

  return (
    <div className="flex min-h-screen bg-app">
      <Sidebar />
      <div className="flex-1 min-w-0 p-9">
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-ink">New analysis</h1>
          <p className="text-[13.5px] text-ink-muted mt-0.5">Upload a chest X-ray to screen for pneumonia.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-4.5 items-start">
          {/* Upload panel */}
          <div className="bg-white border border-line rounded-lg p-5">
            <h2 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-4">Patient &amp; scan</h2>

            <div className="mb-3.5">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Patient</label>
              <select
                className="w-full px-2.5 py-2 border border-gray-300 rounded-md text-[13.5px] focus:outline-none focus:ring-2 focus:ring-brand"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              >
                <option value="">No patient selected</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {!showNewPatient ? (
              <button
                onClick={() => setShowNewPatient(true)}
                className="inline-flex items-center gap-1.5 text-[12.5px] text-brand font-medium mb-5"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                Add new patient
              </button>
            ) : (
              <div className="flex gap-2 mb-5">
                <input
                  autoFocus
                  placeholder="Patient name"
                  className="flex-1 min-w-0 px-2.5 py-2 border border-gray-300 rounded-md text-[13px]"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddPatient()}
                />
                <button
                  onClick={handleAddPatient}
                  className="bg-brand hover:bg-brand-dark text-white px-3 rounded-md text-[13px] font-medium"
                >
                  Save
                </button>
              </div>
            )}

            <label className="block text-xs font-medium text-gray-700 mb-1.5">Chest X-ray image</label>
            <label className="block border border-dashed border-gray-300 rounded-lg bg-app px-4 py-6 text-center mb-4 cursor-pointer hover:border-gray-400 transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 text-ink-faint">
                <path d="M16 16l-4-4-4 4" /><path d="M12 12v9" /><path d="M20.4 17.6A5 5 0 0 0 18 8h-1.3A7 7 0 1 0 4 15.3" />
              </svg>
              <p className="text-[13px] font-medium text-ink mb-0.5">Drag &amp; drop or click to upload</p>
              <p className="text-[11.5px] text-ink-faint">PNG or JPG, up to 10MB</p>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>

            {previewUrl && (
              <>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Preview</label>
                <img
                  src={previewUrl}
                  alt="Selected X-ray preview"
                  className="w-full rounded-md mb-5 border border-line object-cover max-h-[150px]"
                />
              </>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading || !file}
              className="w-full bg-brand hover:bg-brand-dark text-white py-2.5 rounded-md font-medium text-[13.5px] disabled:opacity-50 transition-colors"
            >
              {loading ? "Analyzing…" : "Analyze scan"}
            </button>

            {error && (
              <p className="mt-3.5 text-danger bg-danger-bg border border-danger-border rounded-md p-2 text-sm">
                {error}
              </p>
            )}
          </div>

          {/* Results panel */}
          <div className="bg-white border border-line rounded-lg p-5">
            <h2 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-4">Results</h2>

            {!result ? (
              <div className="bg-app border border-line rounded-md p-8 text-center text-ink-faint text-sm">
                No results yet. Upload a scan to see a prediction here.
              </div>
            ) : (
              <div>
                <div
                  className={`flex justify-between items-center p-4 rounded-md border mb-5 ${
                    isPneumonia ? "bg-danger-bg border-danger-border" : "bg-success-bg border-success-border"
                  }`}
                >
                  <div>
                    <p className={`text-[15px] font-semibold ${isPneumonia ? "text-danger" : "text-success"}`}>
                      {isPneumonia ? "Pneumonia detected" : result.prediction}
                    </p>
                  </div>
                  <span className={`text-[22px] font-bold ${isPneumonia ? "text-danger" : "text-success"}`}>
                    {confidencePct}%
                  </span>
                </div>

                <div className="mb-5">
                  <div className="flex justify-between text-xs text-ink-muted mb-1.5">
                    <span>Confidence</span><span>{confidencePct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-line-soft overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isPneumonia ? "bg-danger" : "bg-success"}`}
                      style={{ width: `${confidencePct}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div>
                    <p className="text-[11.5px] font-semibold text-ink-muted mb-1.5">Original</p>
                    {previewUrl && (
                      <img src={previewUrl} alt="Original X-ray" className="rounded-md w-full h-[140px] object-cover border border-line" />
                    )}
                  </div>
                  <div>
                    <p className="text-[11.5px] font-semibold text-ink-muted mb-1.5">AI attention heatmap</p>
                    {result.heatmap?.overlay_image && (
                      <img
                        src={result.heatmap.overlay_image}
                        alt="GradCAM overlay"
                        className="rounded-md w-full h-[140px] object-cover border border-line"
                      />
                    )}
                  </div>
                </div>

                {result.attention_regions?.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[11.5px] font-semibold text-ink-muted mb-2">Attention regions</p>
                    {result.attention_regions.map((region) => (
                      <div key={region.id} className="flex justify-between py-2 border-t border-line-soft text-[13px]">
                        <span>{region.description}</span>
                        <span className="text-danger font-medium">{region.confidence.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                )}

                {result.findings?.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[11.5px] font-semibold text-ink-muted mb-2">Findings</p>
                    {result.findings.map((finding, i) => (
                      <div key={i} className="flex justify-between py-2 border-t border-line-soft text-[13px] text-warning">
                        <span>{finding.description}</span>
                        <span>{finding.confidence.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-[11.5px] text-ink-faint">
                  {result.ai_explanation?.method}. Not a substitute for professional diagnosis.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
