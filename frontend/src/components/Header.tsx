import { useAuth } from "../contexts/useAuth";
import styles from "./Header.module.css";

export default function Header() {
  const { token, username, logout } = useAuth();
  if (!token) return null;
  return (
    <header className={styles.header}>
      <span className={styles.welcome}>ようこそ {username} 様</span>

      <button className={styles.logoutButton} onClick={logout}>ログアウト</button>
    </header>
  );
}