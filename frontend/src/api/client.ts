export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);
  if (res.status === 401) {
    window.location.href = "/login"; // またはnavigate("/login")
    return;
  }
  return res;
}