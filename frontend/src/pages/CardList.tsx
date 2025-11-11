import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
//   useSortable,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
import { useAuth } from "../contexts/useAuth"
import { apiFetch } from "../api/client";
import { API_ENDPOINTS } from "../api/endpoints";
import type { Card } from "../types/card";
import CardModal from "../components/common/CardModal/CardModal";
import styles from "./CardList.module.css";
// import Card from "../components/Card/Card";
import icon_delete from "../../image/icon_delete.png";
import icon_update from "../../image/icon_update.png";


async function fetchDeckAndCards(deckId: number, token: string) {
  // デッキ名を取得
  const deckRes = await apiFetch(API_ENDPOINTS.DECK_DETAIL(deckId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const deckData = deckRes?.ok ? await deckRes.json() : null;

  // カード一覧を取得
  const cardsRes = await apiFetch(API_ENDPOINTS.CARDS_BY_DECK(deckId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!cardsRes) throw new Error("カード一覧の取得に失敗しました（レスポンスなし）");
  if (!cardsRes.ok) throw new Error("カード一覧の取得に失敗しました");

  const cards: Card[] = await cardsRes.json();

  return { deckName: deckData?.name ?? null, cards };
}


export default function CardList() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [deckName, setDeckName] = useState<string | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // modal
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);

  // Deck一覧に戻る
  const handleNavigateToDecks = () => navigate("/");

  useEffect(() => {

    // TODO：deckIdがなかった場合の処理を再検討
    if (!deckId) return;

    // TODO：tokenがなかった場合の処理を再検討
    if (!deckId || !token) return;

    const load = async () => {
      setLoading(true);
      try {
        const { deckName, cards } = await fetchDeckAndCards(Number(deckId), token);
        setDeckName(deckName);
        setCards(cards);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "予期しないエラーが発生しました");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [deckId, token]);


  const handleCreateCard = async (card: { front: string; back: string }) => {
    const newCardData = {
      front: card.front.trim(),
      back: card.back.trim(),
      deck: deckId,
    };

    try {
      const res = await apiFetch(API_ENDPOINTS.CARDS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCardData),
      });

      if (!res?.ok) throw new Error("カード作成に失敗しました");

      const createdCard = await res.json();
      setCards((prev) => [...prev, createdCard]);
      setCreateOpen(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : "カード作成中にエラーが発生しました");
    }
  };


  const handleEditSubmit = async (values: { front: string; back: string }) => {
    if (!editingCard) return;
    try {
      const res = await apiFetch(API_ENDPOINTS.CARD_DETAIL(Number(editingCard.id)), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...values, deck: deckId }),
      });

      if (res?.ok) {
        const updated: Card = await res.json();
        setCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        setEditOpen(false);
        setEditingCard(null);
      } else {
        alert("カード更新に失敗しました");
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "カード更新中にエラーが発生しました");
    }
  };

  const handleDeleteCard = async (cardId: number) => {
    if (!window.confirm("このカードを本当に削除しますか？")) return;
    try {
      const res = await apiFetch(API_ENDPOINTS.CARD_DETAIL(Number(cardId)), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res?.ok) throw new Error(`削除に失敗しました (${res?.status})`);

      if (res.ok) {
        setCards((prev) => prev.filter((c) => c.id !== cardId));
      } else {
        const text = await res.text();
        alert(`削除に失敗しました: ${res.status}\n${text}`);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "カード削除中にエラーが発生しました");
    }
  };

  return (
    <div>
      <button onClick={handleNavigateToDecks}>＜ デッキ一覧に戻る</button>
      <h2>{deckName} のカード一覧</h2>
      <button onClick={() => setCreateOpen(true)}>新しいカードを作成</button>


      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>読み込み中...</p>}
      {!loading && cards.length === 0 && <p>カードがありません</p>}

      <table border="1">
        <tr>
          <th>#</th>
          <th>表面</th>
          <th>裏面</th>
          <th>編集</th>
          <th>削除</th>
        </tr>
        {cards.map((card, idx) => (
          <tr key={(card.id)}>
            <td>{idx + 1}</td>
            <td>{card.front}</td>
            <td>{card.back}</td>
            <td>
              <button
                className={styles.button}
                onClick={() => {
                  setEditingCard(card);
                  setEditOpen(true);
                }}
              >
                <img src={icon_update} alt="編集" />
              </button>
            </td>
            <td>
              <button
                className={styles.button}
                onClick={() => handleDeleteCard(card.id)}
              >
                <img src={icon_delete} alt="削除" />
              </button>
            </td>
          </tr>
        ))}
      </table>

      {/* 新規追加用モーダル */}
      <CardModal
        isOpen={isCreateOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreateCard}
      />

      {/* 編集用モーダル */}
      <CardModal
        isOpen={isEditOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleEditSubmit}
        initialValues={
          editingCard ? { front: editingCard.front, back: editingCard.back } : undefined
        }
      />
    </div>
  );
}