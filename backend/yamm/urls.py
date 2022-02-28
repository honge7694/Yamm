from django.urls import path, include
from .views import base_views, auth_views

from rest_framework import urls
# app_name = 'yamm'

urlpatterns= [
    # base_views.py
    path('', base_views.index, name='index'),

    # auth_views.py
    path('signup/', auth_views.UserSignup.as_view()),

    # login
    path('api-auth/', include('rest_framework.urls')),
]