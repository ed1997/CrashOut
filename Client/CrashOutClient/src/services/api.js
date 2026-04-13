const API_URL = "http://localhost:5126/api";

export const getCrashReports = async () => {
  const res = await fetch(`${API_URL}/CrashReports`);
  return res.json();
};