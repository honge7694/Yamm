from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
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
        model = User
        fields = ['email', 'nickname', 'name', 'password', 'number']
