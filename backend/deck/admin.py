from django.contrib import admin
from .models import Deck

@admin.register(Deck)
class DeckAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "owner", "created_at", "updated_at")
    search_fields = ("name", "description", "owner__username")
    list_filter = ("created_at", "updated_at")
    ordering = ("-created_at",)