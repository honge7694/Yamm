from dataclasses import field
from unittest.util import _MAX_LENGTH
from django.contrib.auth import get_user_model
from .models import User
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

class UserSerializer(RegisterSerializer):
    '''
    유저 추가
    '''
    nickname = serializers.CharField()
    phonenumber = serializers.CharField()
    taste = serializers.CharField(allow_null=True)
    profile_img = serializers.ImageField(use_url=True, allow_null=True)
        
    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        
        data['nickname'] = self.validated_data.get('nickname', '')
        data['phonenumber'] = self.validated_data.get('phonenumber')
        data['taste'] = self.validated_data.get('taste', '')
        data['profile_img'] = self.validated_data.get('profile_img')

        return data
    
    class Meta:
        model = get_user_model()
        fields = ['email', 'password', 'nickname', 'username', 'phonenumber', 'taste', 'profile_img']

class UserInfoSerializer(serializers.ModelSerializer):
    '''
    유저 정보 반환
    '''
    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'nickname', 'phonenumber', 'taste', 'profile_img']