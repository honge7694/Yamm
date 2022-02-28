from ..serializers import UserSerializer
from ..models import User

from rest_framework import generics


class UserSignup(generics.CreateAPIView):
    '''
    유저 회원가입
    '''
    queryset = User.objects.all()
    serializer_class = UserSerializer