from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import JsonResponse

from ..serializers import UserSerializer, EmailCheckAvailableSerializer
from ..models import User


class UserSignup(generics.CreateAPIView):
    '''
    유저 회원가입
    '''
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()

class UserEmailCheck(APIView):
    '''
    유저 이메일, 닉네임 유효 확인
    '''
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = EmailCheckAvailableSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        response = {}

        errors = serializer.errors

        # if request.data.keys() in errors:
        #     response["error"] = {"result": False, "detail": errors[0]}

        for key in request.data.keys():
            response[key] = {"result": True, "detail": "사용가능한 값 입니다."}

            if key in errors and errors[key]:
                response[key] = {"result": False, "detail": errors[key][0]}

        
        return Response(response, status=status.HTTP_200_OK)

        