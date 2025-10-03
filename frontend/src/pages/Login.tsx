import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../api/endpoints";

export default function Login() {

  // TODO：開発用にフォームの初期値をセット
  const [form, setForm] = useState({ username: "admin", password: "Pass0001" });

  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const data = await res.json();
        login(data.access, data.refresh, form.username);
        navigate("/");
      } else {
        setError("ログイン失敗");
      }
    } catch {
      setError("通信エラー");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="ユーザー名"
        autoComplete="username"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="パスワード"
        autoComplete="current-password"
      />
      <button type="submit">ログイン</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}