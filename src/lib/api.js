const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function analyzeXray(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Server responded with ${res.status}`);
  }

  return res.json();
}

export async function checkHealth() {
  const res = await fetch(`${API_URL}/health`);
  if (!res.ok) throw new Error(`Server responded with ${res.status}`);
  return res.json();
}
