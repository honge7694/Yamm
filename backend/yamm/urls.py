from django.urls import path
from .views import distinction_views, food_views


urlpatterns = [
    # distinction_views.py
    path('distinction', distinction_views.Distinction.as_view(), name='distinction'),

    # food_views.py
    path('food/eaten', food_views.Eaten.as_view(), name='eaten'),
    path('food/search', food_views.Search.as_view(), name='search'),
    path('food/nutrient', food_views.Nutrient.as_view(), name='nutrient'),
]
