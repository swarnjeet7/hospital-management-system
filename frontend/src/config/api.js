/**
 * API base URL without trailing slash.
 * - Dev: default "" so requests use `/api/...` and Vite proxy forwards to the backend.
 * - Set `VITE_API_BASE_URL` when the API is on another host (e.g. production).
 */
export function getApiBaseUrl() {
  const fromEnv = import.meta.env.VITE_API_BASE_URL?.trim() || import.meta.env.VITE_API_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, "");
  }
  if (import.meta.env.DEV) {
    return "";
  }
  return "";
}

/** Full URL for an API path (path must start with `/`, e.g. `/api/auth/login`). */
export function apiUrl(path) {
  const base = getApiBaseUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export const LOGIN_ENDPOINT =
  import.meta.env.VITE_LOGIN_ENDPOINT?.trim() || apiUrl("/api/auth/login");

export const REGISTER_ENDPOINT =
  import.meta.env.VITE_REGISTER_ENDPOINT?.trim() || apiUrl("/api/auth/register");
