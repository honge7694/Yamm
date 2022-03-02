from dataclasses import field
from django.contrib.auth import get_user_model
from .models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    '''
    유저 추가
    '''
    def create(self, validated_data):
        user = User.objects.create_user(
            # validated_data 유효성 검사
            email = validated_data['email'],
            password = validated_data['password'],
            name = validated_data['name'],
            nickname = validated_data['nickname'],
            number = validated_data['number'],
            taste = validated_data['taste']
        )

        return user

    class Meta:
        model = get_user_model()
        fields = ['email', 'password', 'nickname', 'name', 'number', 'taste']

class EmailCheckAvailableSerializer(serializers.ModelSerializer):
    '''
    이메일, 닉네임 유효성 체크
    '''
    class Meta:
        model = get_user_model()
        fields = ['email', 'nickname']
        # extra_kwargs = {
        #     'email': {"required": True, "write_only": True},
        #     'nickname': {"required": True, "write_only": True},
        # }


class TokenObtainPairResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class TokenRefreshResponseSerializer(serializers.Serializer):
    access = serializers.CharField()

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class TokenVerifyResponseSerializer(serializers.Serializer):
    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class TokenBlacklistResponseSerializer(serializers.Serializer):
    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()
