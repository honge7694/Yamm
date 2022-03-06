from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from rest_framework_simplejwt.views import (
    TokenBlacklistView,
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from django.http import JsonResponse

from ..serializers import (
    UserSerializer, 
    EmailCheckAvailableSerializer,
    TokenRefreshResponseSerializer,
    TokenVerifyResponseSerializer,
    TokenBlacklistResponseSerializer,
)
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
        serializer.is_valid(raise_exception=False)

        response = {}

        errors = serializer.errors

        # if request.data.keys() in errors:
        #     response["error"] = {"result": False, "detail": errors[0]}

        for key in request.data.keys():
            response[key] = {"result": True, "detail": "사용가능한 값 입니다."}

            if key in errors and errors[key]:
                response[key] = {"result": False, "detail": errors[key][0]}
        
        return Response(response, status=status.HTTP_200_OK)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    '''
    로그인 토큰 생성
    '''
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.name
        token['nickname'] = user.nickname
        token['email'] = user.email
        token['phonenumber'] = user.phonenumber
        token['taste'] = user.taste
        token['profile_img'] = str(user.profile_img)
        print(user.profile_img)
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class DecoratedTokenRefreshView(TokenRefreshView):
    '''
    로그인 토큰 갱신
    '''
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenRefreshResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class DecoratedTokenVerifyView(TokenVerifyView):
    '''
    로그인 토큰 유효성 검사
    '''
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenVerifyResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class DecoratedTokenBlacklistView(TokenBlacklistView):
    '''
    로그아웃 refresh 토큰 삭제
    '''
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenBlacklistResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

