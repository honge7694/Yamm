from django.urls import path, include
from .views import base_views, auth_views

# app_name = 'yamm'

urlpatterns= [
    # base_views.py
    path('', base_views.index, name='index'),

    # auth_views.py
    path('check/', auth_views.UserEmailCheck.as_view()),
    path('signup/', auth_views.UserSignup.as_view()),
    path('signin/', auth_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),  # override sjwt stock token
    path('token/refresh/', auth_views.DecoratedTokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', auth_views.DecoratedTokenVerifyView.as_view(), name='token_verify'),
    path('signout/', auth_views.DecoratedTokenBlacklistView.as_view(), name='token_blacklist'),
    

    # login test
    path('api-auth/', include('rest_framework.urls')),
    
]