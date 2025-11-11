from django.contrib import admin
from django.urls import path, include
from deck.views import DeckViewSet , CardViewSet
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'decks', DeckViewSet, basename='deck')
router.register(r'cards', CardViewSet, basename='card')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
