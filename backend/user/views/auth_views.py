from rest_framework import generics
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from ..models import User
from ..serializers import UserInfoSerializer

class UserInfo(APIView):
    # authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = UserInfoSerializer

    def get_object(self, queryset=None):
        
        return self.request.user

    def get(self, request, *args, **kwargs):
        '''
        유저 정보 조회
        '''
        self.user = self.get_object()
        
        serializer = self.serializer_class(self.user, context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)
