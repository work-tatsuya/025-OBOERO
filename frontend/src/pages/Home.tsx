import { useEffect, useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { API_ENDPOINTS } from "../api/endpoints";
import DeckList from "../components/DeckList/DeckList";
import { apiFetch } from "../api/client";

export default function Home() {

  type Deck = {
    id: number;
    name: string;
    description?: string;
    owner: string;
    created_at: string;
    updated_at: string;
  };

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

  return (
    <div>
      <h1>マイデッキ</h1>
      <DeckList decks={myDecks} />
      <DeckList decks={myDecks} />
    </div>
  );
}
