from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from .views import base_views, auth_views, distinction_views, food_views

from rest_framework import urls

# app_name = 'yamm'

urlpatterns = [
    # base_views.py
    path('', base_views.index, name='index'),

    # auth_views.py
    path('check/', auth_views.UserEmailCheck.as_view()),
    path('signup/', auth_views.UserSignup.as_view()),
    path('signin/', auth_views.DecoratedTokenObtainPairView.as_view(),
         name='token_obtain_pair'),  # override sjwt stock token
    path('token/refresh/', auth_views.DecoratedTokenRefreshView.as_view(),
         name='token_refresh'),
    path('token/verify/', auth_views.DecoratedTokenVerifyView.as_view(),
         name='token_verify'),
    path('signout/', auth_views.DecoratedTokenBlacklistView.as_view(),
         name='token_blacklist'),

    # distinction_views.py
    path('distinction', distinction_views.distinction.as_view(), name='distinction'),

    # food_views.py
    path('food/eaten', food_views.eaten.as_view(), name='eaten'),
    path('food/search', food_views.search.as_view(), name='search'),
    path('food/nutrient', food_views.nutrient.as_view(), name='nutrient'),

    # login test
    path('api-auth/', include('rest_framework.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
