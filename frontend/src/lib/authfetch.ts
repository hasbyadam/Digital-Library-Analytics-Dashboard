export async function authFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const token = localStorage.getItem("token");

  const headers = {
    ...(init?.headers || {}),
    "Content-Type": "application/json",
    ...(token ? { Authorization: `${token}` } : {}),
  };

  const config: RequestInit = {
    ...init,
    headers,
  };

  return fetch(input, config);
}
