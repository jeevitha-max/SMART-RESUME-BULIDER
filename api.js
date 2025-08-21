import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const suggest = async (payload) => {
  const { data } = await axios.post(`${API_BASE}/api/suggest`, payload);
  return data.suggestions;
};

export const saveResume = async (payload) => {
  const { data } = await axios.post(`${API_BASE}/api/resumes`, payload);
  return data.id;
};

export const fetchResume = async (id) => {
  const { data } = await axios.get(`${API_BASE}/api/resumes/${id}`);
  return data;
};
