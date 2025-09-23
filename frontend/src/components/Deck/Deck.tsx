type Deck = {
  id: number;
  name: string;
  description?: string;
  owner: string;
  created_at: string;
  updated_at: string;
};

type DeckListProps = {
  deck: Deck;
};

export default function Deck({ deck }: DeckListProps) {
  return (
    <div>
      <strong>{deck.name}</strong> - {deck.description || "No description"} <br />
      更新日: {new Date(deck.updated_at).toLocaleString()}
    </div>
  );
}