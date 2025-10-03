import { useState } from "react";
import styles from "./Deck.module.css";
import icon_delete from "../../../image/icon_delete.png";
import icon_update from "../../../image/icon_update.png";
import { useAuth } from "../../contexts/useAuth";
import { apiFetch } from "../../api/client";
import { API_ENDPOINTS } from "../../api/endpoints";
import DeckModal from "../common/DeckModal/DeckModal";
import type { Deck } from "../../types/deck";

type DeckListProps = {
  deck: Deck;
  onDelete: (id: number) => void;
  onUpdate: (updatedDeck: Deck) => void;
};

export default function Deck({ deck, onDelete, onUpdate }: DeckListProps) {
  const { token } = useAuth();
  const [isEditOpen, setEditOpen] = useState(false);
  const openEditModal = () => setEditOpen(true);
  const closeEditModal = () => setEditOpen(false);

  // デッキ編集
  const handleEditSubmit = async (values: { name: string; description?: string }) => {
    try {
      const res = await apiFetch(API_ENDPOINTS.DECK_DETAIL(deck.id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      if (res?.ok) {
        const updated = await res.json();
        onUpdate(updated);
      } else {
        alert("更新に失敗しました");
      }
    } catch (err) {
      console.error("更新エラー:", err);
      alert("エラーが発生しました");
    }
    closeEditModal();
  };

  // デッキ削除
  const handleDelete = async () => {
    if (!window.confirm(`"${deck.name}" を本当に削除しますか？`)) return;
    try {
      const res = await apiFetch(API_ENDPOINTS.DECK_DETAIL(deck.id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res) {
        alert("認証エラーです。再ログインしてください。");
        return;
      }
      if (res.ok) {
        onDelete(deck.id);
      } else {
        alert("削除に失敗しました");
      }
    } catch (err) {
      console.error("更新エラー:", err);
      alert("エラーが発生しました");
    }
  };

  // 日付フォーマット
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  };

  return (
    <div className={styles.DeckContainer}>
      {/* D&Dアイコン（未実装） */}

      {/* デッキ情報 */}
      <div className={styles.DeckCenter}>
        <strong>{deck.name}</strong>
        <span className={styles.DeckDescription}>{deck.description || ""}</span>
        <span className={styles.DeckUpdatedat}>{formatDate(deck.updated_at)}</span>
      </div>

      {/* ボタン群 */}
      <div className={styles.DeckRight}>
        <button className={styles.button} onClick={openEditModal}>
          <img src={icon_update} alt="編集" />
        </button>
        <button className={styles.button} onClick={handleDelete}>
          <img src={icon_delete} alt="削除" />
        </button>
      </div>

      {/* 編集モーダル */}
      <DeckModal
        isOpen={isEditOpen}
        onClose={closeEditModal}
        initialValues={{ name: deck.name, description: deck.description }}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
}