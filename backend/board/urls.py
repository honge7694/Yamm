from django.urls import path
from .views import board_views

'''
GET     boards 목록
GET     boards/reactions 목록
POST    boards 생성

GET     boards/<pk> 조회
PUT     boards/<pk> 수정
DELETE  boards/<pk> 삭제

POST    boards/<pk>/reaction 추천, 한번 더 보내면 삭제.
'''
urlpatterns =[
    path('', board_views.PostListAPIView.as_view()),
    path('<int:pk>', board_views.PostRetrieveUpdateDestroyAPIView.as_view()),
    # path('reaction', board_views.PostListReactionAPIView.as_view()),
    path('<int:pk>/reaction', board_views.PostReactionAPIView.as_view()),
]