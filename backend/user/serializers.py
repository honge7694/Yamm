from wsgiref import validate
from django.contrib.auth import get_user_model
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from rest_framework.validators import UniqueValidator
from .models import User

class UserSerializer(RegisterSerializer):
    '''
    유저 추가
    '''
    nickname = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all(), message=("Name already exists"))])
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
        fields = ['email', 'password', 'nickname', 'username', 'phonenumber', 'taste', 'profile_img', 'reaction', 'user_img']


class UserInfoSerializer(serializers.ModelSerializer):
    '''
    유저 정보 반환
    '''
    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'nickname', 'phonenumber', 'taste', 'profile_img']