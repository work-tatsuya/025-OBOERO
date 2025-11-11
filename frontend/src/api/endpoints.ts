const API_BASE = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE}/api/token/`,
  REFRESH: `${API_BASE}/api/token/refresh/`,
  USER: `${API_BASE}/api/user/`,
  DECKS: `${API_BASE}/api/decks/`,
  DECK_DETAIL: (id: number) => `${API_BASE}/api/decks/${id}/`,
  CARDS: `${API_BASE}/api/cards/`,
  CARD_DETAIL: (id: number) => `${API_BASE}/api/cards/${id}/`,
  CARDS_BY_DECK: (deckId: number) => `${API_BASE}/api/cards/?deck=${deckId}`, // Deck に紐づくカード一覧
};