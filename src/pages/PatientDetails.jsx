import { Fragment, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getPatients, addPatient, deletePatient } from "../lib/patients";
import { getScansForPatient } from "../lib/history";

export default function PatientDetails() {
  const [patients, setPatients] = useState(() => getPatients());
  const [expandedId, setExpandedId] = useState(null);
  const [form, setForm] = useState({ name: "", age: "", gender: "", contact: "", notes: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Patient name is required.");
      return;
    }
    setError("");
    addPatient(form);
    setPatients(getPatients());
    setForm({ name: "", age: "", gender: "", contact: "", notes: "" });
  };

  const handleDelete = (id) => {
    deletePatient(id);
    setPatients(getPatients());
    if (expandedId === id) setExpandedId(null);
  };

  return (
    <div className="flex min-h-screen bg-app">
      <Sidebar />
      <div className="flex-1 min-w-0 p-9">
        <div className="flex flex-wrap gap-3.5 justify-between items-center mb-5">
          <div>
            <h1 className="text-lg font-semibold text-ink">Patient records</h1>
            <p className="text-[13.5px] text-ink-muted mt-0.5">Register patients and review their scan history.</p>
          </div>
        </div>

        {/* Add Patient */}
        <div className="bg-white border border-line rounded-lg p-5 mb-5">
          <h2 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3.5">New patient</h2>
          {error && (
            <p className="mb-3 text-danger bg-danger-bg border border-danger-border rounded-md p-2 text-sm">
              {error}
            </p>
          )}
          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            <input
              name="name"
              placeholder="Full name *"
              className="px-2.5 py-2 border border-gray-300 rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-brand"
              value={form.name}
              onChange={handleChange}
            />
            <input
              name="age"
              placeholder="Age"
              type="number"
              min="0"
              className="px-2.5 py-2 border border-gray-300 rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-brand"
              value={form.age}
              onChange={handleChange}
            />
            <select
              name="gender"
              className="px-2.5 py-2 border border-gray-300 rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-brand"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              name="contact"
              placeholder="Phone / email"
              className="px-2.5 py-2 border border-gray-300 rounded-md text-[13px] focus:outline-none focus:ring-2 focus:ring-brand"
              value={form.contact}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-brand hover:bg-brand-dark text-white rounded-md px-4 py-2 font-medium text-[13px] transition-colors"
            >
              Add patient
            </button>
            <textarea
              name="notes"
              placeholder="Notes (optional): symptoms, history, etc."
              className="px-2.5 py-2 border border-gray-300 rounded-md text-[13px] sm:col-span-2 lg:col-span-5 focus:outline-none focus:ring-2 focus:ring-brand"
              rows={2}
              value={form.notes}
              onChange={handleChange}
            />
          </form>
        </div>

        {/* Patient List */}
        {patients.length === 0 ? (
          <div className="bg-white border border-line rounded-lg p-8 text-ink-faint text-center text-sm">
            No patients added yet. Use the form above to register one.
          </div>
        ) : (
          <div className="bg-white border border-line rounded-lg overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-app">
                  <th className="text-left text-[11px] font-semibold uppercase tracking-wide text-ink-muted px-3.5 py-2.5">Name</th>
                  <th className="text-left text-[11px] font-semibold uppercase tracking-wide text-ink-muted px-3.5 py-2.5">Age</th>
                  <th className="text-left text-[11px] font-semibold uppercase tracking-wide text-ink-muted px-3.5 py-2.5">Gender</th>
                  <th className="text-left text-[11px] font-semibold uppercase tracking-wide text-ink-muted px-3.5 py-2.5">Contact</th>
                  <th className="text-left text-[11px] font-semibold uppercase tracking-wide text-ink-muted px-3.5 py-2.5">Added</th>
                  <th className="text-left text-[11px] font-semibold uppercase tracking-wide text-ink-muted px-3.5 py-2.5">Scans</th>
                  <th className="px-3.5 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => {
                  const scans = getScansForPatient(p.id);
                  const isOpen = expandedId === p.id;
                  return (
                    <Fragment key={p.id}>
                      <tr
                        className="border-t border-line-soft cursor-pointer hover:bg-app"
                        onClick={() => setExpandedId(isOpen ? null : p.id)}
                      >
                        <td className="px-3.5 py-3 font-medium text-ink">{p.name}</td>
                        <td className="px-3.5 py-3">{p.age || "—"}</td>
                        <td className="px-3.5 py-3">{p.gender || "—"}</td>
                        <td className="px-3.5 py-3">{p.contact || "—"}</td>
                        <td className="px-3.5 py-3 text-ink-faint">
                          {new Date(p.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-3.5 py-3">{scans.length}</td>
                        <td className="px-3.5 py-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(p.id);
                            }}
                            className="text-danger hover:underline text-xs"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                      {isOpen && (
                        <tr className="bg-app border-t border-line-soft">
                          <td colSpan={7} className="p-4">
                            {p.notes && (
                              <p className="mb-3 text-ink-soft text-sm">
                                <span className="font-semibold">Notes:</span> {p.notes}
                              </p>
                            )}
                            {scans.length === 0 ? (
                              <p className="text-ink-faint text-sm">No scans recorded for this patient yet.</p>
                            ) : (
                              <div className="space-y-1.5">
                                {scans.map((s) => (
                                  <div
                                    key={s.id}
                                    className="flex justify-between bg-white border border-line rounded-md p-2 text-sm"
                                  >
                                    <span
                                      className={
                                        s.prediction === "Pneumonia"
                                          ? "text-danger font-medium"
                                          : "text-success font-medium"
                                      }
                                    >
                                      {s.prediction} ({(s.confidence * 100).toFixed(1)}%)
                                    </span>
                                    <span className="text-ink-faint">{new Date(s.date).toLocaleString()}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
