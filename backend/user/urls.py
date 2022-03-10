from django.urls import path, include
from .views import auth_views

'''
/user/user         : .
/user/signup       : 회원가입
/user/login        : 로그인
/user/logout       : 로그아웃
/user/token/verify : 유효성 검사
/user/token/refresh: 토큰 재발급
'''

urlpatterns= [
    # dj_rest_auth
    path('', include('dj_rest_auth.urls')),
    path('signup/', include('dj_rest_auth.registration.urls')),

    path('info/', auth_views.UserInfo.as_view()),
]