import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { API_ENDPOINTS } from "../api/endpoints";
import DeckList from "../components/DeckList/DeckList";
import { apiFetch } from "../api/client";
import styles from "./Home.module.css";
import type { Deck } from "../types/deck";

export default function Home() {

  const { token } = useAuth();
  const [myDecks, setMyDecks] = useState<Deck[]>([]);

  useEffect(() => {
    apiFetch(API_ENDPOINTS.DECKS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res && res.json())
      .then(setMyDecks);
  }, [token]);

  const addDeck = (newDeck: Deck) => {
    setMyDecks((prev) => [...prev, newDeck]);
  };

  const handleUpdateDeck = (updatedDeck: Deck) => {
    setMyDecks((prev) =>
      prev.map((deck) => (deck.id === updatedDeck.id ? updatedDeck : deck))
    );
  };

  // 子から通知を受けて state を更新
  const handleDeleteDeck = (id: number) => {
    setMyDecks((prev) => prev.filter((deck) => deck.id !== id));
  };

  return (
    <div style={{ paddingTop: "64px" }}>
      <div className={styles.DeckList}>
        <DeckList
          decks={myDecks}
          deckName="あなたのデッキ"
          onCreate={addDeck}
          onDelete={handleDeleteDeck}
          onUpdate={handleUpdateDeck}
        />
        <DeckList
          decks={myDecks}
          deckName="保存したデッキ"
          onDelete={handleDeleteDeck}
          onUpdate={handleUpdateDeck}
        />
        {/* <DeckList
        decks={myDecks}
        deckName="他の人のデッキ"
        onDelete={handleDeleteDeck}
        onUpdate={handleUpdateDeck}
      /> */}
      </div >
    </div >
  );
}
