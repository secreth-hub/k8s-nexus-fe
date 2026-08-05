// Internal-only API base URL — a cluster-internal DNS name (Lesson 3's
// Service DNS pattern), set at deploy time via the Helm chart. Deliberately
// NOT prefixed with NEXT_PUBLIC_ — that prefix gets inlined into the client
// bundle at build time, and this value must stay server-only.
const API_INTERNAL_URL = process.env.API_INTERNAL_URL ?? "http://localhost:8000";

export async function apiFetch(path: string, options: RequestInit = {}) {
  return fetch(`${API_INTERNAL_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
  });
}
