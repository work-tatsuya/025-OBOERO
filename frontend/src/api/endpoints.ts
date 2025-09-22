const API_BASE = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE}/api/token/`,
  USER: `${API_BASE}/api/user/`,
};