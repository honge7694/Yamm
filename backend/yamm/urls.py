from django.urls import path
from .views import base_views

# app_name = 'yamm'

urlpatterns= [
    # base_views.py
    path('', base_views.index, name='index')
]