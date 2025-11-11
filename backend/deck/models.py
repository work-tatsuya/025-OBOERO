from django.db import models
from django.contrib.auth.models import User

class Deck(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="decks")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
class Card(models.Model):
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE, related_name="cards")
    front = models.CharField(max_length=255)
    back = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.front} -> {self.back[:20]}"