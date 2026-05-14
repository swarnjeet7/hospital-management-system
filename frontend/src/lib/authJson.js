import { apiUrl } from "../config/api.js";

export function getAccessToken() {
  return localStorage.getItem("medicore_token") ?? sessionStorage.getItem("medicore_token");
}

function normalizeApiErrorMessage(text, status) {
  if (!text || typeof text !== "string") {
    return status ? `Request failed (${status})` : "Request failed";
  }
  const trimmed = text.trim();
  if (!trimmed) return `Request failed (${status})`;
  const looksHtml = trimmed.startsWith("<!") || trimmed.startsWith("<html");
  if (looksHtml || trimmed.length > 800) {
    if (status === 502 || status === 503 || status === 504) {
      return `API unavailable (${status}). Start the backend (default http://127.0.0.1:5000) and ensure Vite proxies /api to it.`;
    }
    if (status === 500) {
      return `Server error (${status}). Check the backend terminal log; often the database needs: cd backend && npx prisma migrate deploy`;
    }
    return `Request failed (${status}). The server did not return JSON (is the backend running?).`;
  }
  return trimmed.length > 500 ? `${trimmed.slice(0, 500)}…` : trimmed;
}

/**
 * @param {string} path - e.g. `/api/patients`
 * @param {RequestInit} [options]
 */
export async function authJson(path, options = {}) {
  const token = getAccessToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };
  const url = path.startsWith("http") ? path : apiUrl(path);
  const res = await fetch(url, { ...options, headers });
  const text = await res.text();
  let body = {};
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = { message: text };
    }
  }
  if (!res.ok) {
    const raw =
      (typeof body?.message === "string" && body.message) ||
      (typeof body?.errorMessage === "string" && body.errorMessage) ||
      (typeof body?.error === "string" && body.error) ||
      res.statusText;
    const msg = normalizeApiErrorMessage(raw, res.status);
    throw new Error(msg || `Request failed (${res.status})`);
  }
  return body;
}
