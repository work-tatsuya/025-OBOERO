import Deck from "../Deck/Deck";

type Deck = {
  id: number;
  name: string;
  description?: string;
  owner: string;
  created_at: string;
  updated_at: string;
};

type DeckListProps = {
  decks: Deck[];
};

export default function DeckList({ decks }: DeckListProps) {
  if (decks.length === 0) return <p>デッキはまだありません。</p>;

  return (
    <div>
      <h2>Deck List</h2>
      <ul>
        {decks.map((deck) => (
          <li key={deck.id}>
            <Deck deck={deck} />
          </li>
        ))}

      </ul>
    </div>
  );
}