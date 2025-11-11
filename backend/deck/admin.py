from django.contrib import admin
from .models import Deck , Card

@admin.register(Deck)
class DeckAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "owner", "created_at", "updated_at")
    search_fields = ("name", "description", "owner__username")
    list_filter = ("created_at", "updated_at")
    ordering = ("-created_at",)

@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    list_display = ("front", "back", "deck", "created_at")
    list_filter = ("deck",)
    search_fields = ("front", "back")