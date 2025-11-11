from rest_framework import viewsets, permissions
from .models import Deck , Card
from .serializers import DeckSerializer
from .serializers_card import CardSerializer

class DeckViewSet(viewsets.ModelViewSet):
    serializer_class = DeckSerializer
    permission_classes = [permissions.IsAuthenticated]

    # 自分のデッキをすべて返す
    def get_queryset(self):
        return Deck.objects.filter(owner=self.request.user)

    # デッキ作成時にownerカラムに自身をセットする
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # リクエストユーザーが所有するカードのみを返す
        qs = Card.objects.filter(deck__owner=self.request.user)
        deck_id = self.request.query_params.get('deck')
        if deck_id:
            qs = qs.filter(deck_id=deck_id)
        return qs
    
    def perform_create(self, serializer):
        deck = serializer.validated_data.get('deck')
        if deck.owner != self.request.user:
            raise PermissionError("このデッキにはカードを追加できません")
        serializer.save()