from django.urls import path
from .views import base_views, auth_views, distinction_views, upload_views, food_views

urlpatterns= [
    # base_views.py
    path('', base_views.index, name='index'),

    # auth_views.py
    path('signup', auth_views.user_signup, name='user_signup'),
    path('signin', auth_views.user_signin, name='user_signin'),
    path('signup/email', auth_views.user_email, name='user_email'),
    path('signup/nickname', auth_views.user_nickname, name='user_nickname')

    path('distinction', distinction_views.distinction, name='distinction'),
    path('upload/img', upload_views.upload, name='upload'),
    path('upload/info', upload_views.upload_info, name='upload_info'),
    path('food/eaten', food_views.eaten, name='eaten'),
]
