from django.urls import path, include
from .views import base_views, auth_views

from rest_framework import urls
from rest_framework_simplejwt import views as jwt_views

# app_name = 'yamm'

urlpatterns= [
    # base_views.py
    path('', base_views.index, name='index'),

    # auth_views.py
    path('signup/', auth_views.UserSignup.as_view()),
    path('check/', auth_views.UserEmailCheck.as_view()),
    
    # jwt
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

    # login test
    path('api-auth/', include('rest_framework.urls')),
]