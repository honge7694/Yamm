
from django.urls import path, include
from .views import distinction_views, food_views

from rest_framework import urls

# app_name = 'yamm'

urlpatterns = [
    # distinction_views.py
    path('distinction', distinction_views.distinction.as_view(), name='distinction'),

    # food_views.py
    path('food/eaten', food_views.eaten.as_view(), name='eaten'),
    path('food/search', food_views.search.as_view(), name='search'),
    path('food/nutrient', food_views.nutrient.as_view(), name='nutrient'),

    # login test
    path('api-auth/', include('rest_framework.urls')),
]
