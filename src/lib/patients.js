const PATIENTS_KEY = "pneumoai_patients";

export function getPatients() {
  try {
    return JSON.parse(localStorage.getItem(PATIENTS_KEY)) || [];
  } catch {
    return [];
  }
}

export function getPatient(id) {
  return getPatients().find((p) => p.id === id) || null;
}

export function addPatient({ name, age, gender, contact, notes }) {
  const patients = getPatients();
  const patient = {
    id: crypto.randomUUID(),
    name,
    age: age || "",
    gender: gender || "",
    contact: contact || "",
    notes: notes || "",
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(PATIENTS_KEY, JSON.stringify([patient, ...patients]));
  return patient;
}

export function deletePatient(id) {
  const patients = getPatients().filter((p) => p.id !== id);
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
}
