from django.urls import path
from .views import base_views, distinction_views, upload_views, food_views

# app_name = 'yamm'

urlpatterns = [
    path('', base_views.index, name='index'),
    path('distinction', distinction_views.distinction, name='distinction'),
    path('upload/img', upload_views.upload, name='upload'),
    path('upload/info', upload_views.upload_info, name='upload_info'),
    path('food/eaten', food_views.eaten, name='eaten'),
]
