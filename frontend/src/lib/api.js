import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  withCredentials: true,
});

// Resolve an image reference: full URL passes through, storage path routes via backend.
export const resolveImage = (ref) => {
  if (!ref) return "";
  if (ref.startsWith("http://") || ref.startsWith("https://")) return ref;
  return `${API}/files/${ref}`;
};

export default api;
