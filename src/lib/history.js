const HISTORY_KEY = "pneumoai_scan_history";

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

export function getScansForPatient(patientId) {
  return getHistory().filter((h) => h.patientId === patientId);
}

export function addScanRecord(record) {
  const history = getHistory();
  const entry = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    ...record,
  };
  localStorage.setItem(HISTORY_KEY, JSON.stringify([entry, ...history]));
  return entry;
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}
