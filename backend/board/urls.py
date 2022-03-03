from django.urls import path, include
from .views import board_views

urlpatterns =[
    path('', board_views.PostList.as_view()),
    # path('write/', board_views.PostWirte.as_view()),
    # path('delete/', )
]