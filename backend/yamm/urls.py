from django.urls import path
from .views import auth_views, base_views

# app_name = 'yamm'

urlpatterns= [
    # base_views.py
    path('', base_views.index, name='index'),

    # auth_views.py
    path('signup', auth_views.user_signup, name='user_signup'),
    path('signin', auth_views.user_signin, name='user_signin'),
    path('signup/email', auth_views.user_email, name='user_email'),
    path('signup/nickname', auth_views.user_nickname, name='user_nickname')

]