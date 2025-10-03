import { API_ENDPOINTS } from "./endpoints";

export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  const token = localStorage.getItem("token");
  const refresh = localStorage.getItem("refresh");

  // 1回目のリクエスト
  let res = await fetch(input, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  // 401ならリフレッシュを試みる
  if (res.status === 401 && refresh) {
    console.log("トークンをリフレッシュします")
    const refreshRes = await fetch(API_ENDPOINTS.REFRESH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
    if (refreshRes.ok) {
      const data = await refreshRes.json();
      localStorage.setItem("token", data.access);
      // 再リクエスト
      res = await fetch(input, {
        ...init,
        headers: {
          ...(init?.headers || {}),
          Authorization: `Bearer ${data.access}`,
        },
      });
      return res;
    } else {
      console.log("トークンがリフレッシュできなかったので、ログイン画面に戻ります。")
      window.location.href = "/login";
      return;
    }
  }
  return res;
}