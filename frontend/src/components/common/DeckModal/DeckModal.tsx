import { useState, useEffect } from "react";
import styles from "./DeckModal.module.css";

type DeckModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: { name: string; description?: string };
  onSubmit: (deck: { name: string; description?: string }) => void;
};

export default function DeckModal({ isOpen, onClose, initialValues, onSubmit }: DeckModalProps) {
  const [form, setForm] = useState<{ name: string; description?: string }>({
    name: "",
    description: "",
  });

  useEffect(() => {
    setForm(initialValues || { name: "", description: "" });
  }, [initialValues]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", description: "" });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>デッキ作成</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            デッキ名
            <input
              type="text"
              className={styles.input}
              placeholder="例: 英単語 基礎"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.label}>
            説明
            <textarea
              className={styles.textarea}
              placeholder="例: 毎日の学習用の基礎単語集"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </label>
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancel}>
              キャンセル
            </button>
            <button type="submit" className={styles.submit}>
              作成
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
