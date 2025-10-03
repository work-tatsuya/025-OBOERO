from rest_framework import serializers
from .models import Deck

class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = ['id', 'name', 'description', 'owner', 'created_at' , 'updated_at']
        read_only_fields = ['id', 'owner', 'created_at' , 'updated_at']
