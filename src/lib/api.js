const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function getStoredToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ideavault_token");
}

export function setStoredToken(token) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem("ideavault_token", token);
  else localStorage.removeItem("ideavault_token");
}

export async function syncAuthAfterLogin(authClient) {
  const { data } = await authClient.getSession();
  if (data?.user) return syncJwtFromSession(data.user);
  return null;
}

export async function syncJwtFromSession(user) {
  if (!user?.email) return null;
  const res = await fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: user.email,
      name: user.name,
      image: user.image,
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  setStoredToken(data.token);
  return data.token;
}

export async function apiFetch(path, options = {}) {
  const token = getStoredToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  return res;
}

export { API_URL };
