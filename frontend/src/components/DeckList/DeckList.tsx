import { useState } from "react";
import Deck from "../Deck/Deck";
import styles from "./DeckList.module.css";
import DeckModal from "../../components/common/DeckModal/DeckModal";
import { useAuth } from "../../contexts/useAuth";
import { apiFetch } from "../../api/client";
import { API_ENDPOINTS } from "../../api/endpoints";
import type { Deck as DeckType } from "../../types/deck";

type DeckListProps = {
  decks: DeckType[];
  deckName?: string;
  onCreate?: (deck: DeckType) => void;
  onDelete: (id: number) => void;
  onUpdate: (updatedDeck: DeckType) => void;
};

export default function DeckList({ decks, deckName, onCreate, onDelete, onUpdate }: DeckListProps) {

  const { token } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  if (decks.length === 0) return <p>デッキはまだありません。</p>;


  const handleCreateDeck = async (deck: { name: string; description?: string }) => {
    const newDeckData = {
      name: deck.name.trim(),
      description: deck.description ? deck.description.trim() : undefined,
    };

    const res = await apiFetch(API_ENDPOINTS.DECKS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newDeckData),
    });

    if (res?.ok) {
      const createdDeck = await res.json();
      onCreate?.(createdDeck); // 親に通知
    } else {
      alert("デッキ作成に失敗しました");
    }
  };

  return (
    <div className={styles.container}>
      <h2>{deckName}</h2>

      {/* <button onClick={handleCreateDeck}>＋ デッキを追加</button> */}
      <div>
        <button onClick={() => setModalOpen(true)}>新しいデッキを作成</button>
        <DeckModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreateDeck}
        />
      </div>

      {decks.map((deck) => (
        <Deck key={deck.id} deck={deck} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
}