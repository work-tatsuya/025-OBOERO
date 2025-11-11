import { useState, useEffect } from "react";
import styles from "./CardModal.module.css";

type CardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: { front: string; back: string };
  onSubmit: (card: { front: string; back: string }) => void;
};

export default function CardModal({ isOpen, onClose, initialValues, onSubmit }: CardModalProps) {
  const [form, setForm] = useState<{ front: string; back: string }>({
    front: "",
    back: "",
  });

  useEffect(() => {
    setForm(initialValues || { front: "", back: "" });
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
    setForm({ front: "", back: "" });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>カード作成</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            表面
            <input
              type="text"
              className={styles.input}
              placeholder="例: beginning "
              name="front"
              value={form.front}
              onChange={handleChange}
              required
            />
          </label>
          <label className={styles.label}>
            裏面
            <textarea
              className={styles.textarea}
              placeholder="例: 始まり"
              name="back"
              value={form.back}
              onChange={handleChange}
              required
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
