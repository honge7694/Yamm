from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema

from ..models import User, Food, FoodImage
from ..serializers import FoodSerializer, FoodImageSerializer


# TODO: 미완성
# eaten: 먹은 음식 리스트 불러오기
# eaten_update: 먹은 음식 상세 정보 수정
# 전체: permission 연동되면 수정하기

class eaten(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        '''
        먹은 음식 리스트 불러오기
        '''
        # TODO: email 부분 request.user 로 바꾸기
        # TODO: 로직 완성하기 + 완성이 우선이지만, 장고답게 개발하려고 고민해보기
        user = get_object_or_404(User, email="test@test.com")
        print(request.data["date"])

        # food_image = FoodImage.objects.filter(date=request.data["date"])
        food_image = FoodImage.objects.all()
        serializer = FoodImageSerializer(food_image, many=True)

        # list = []
        # for obj in serializer.data:
        #     dict = {}
        #     dict["image"] = obj["image"]
        #     dict["food_name"] = obj["name"]
        # dict[""]

        response = list
        return Response(serializer.data, status.HTTP_200_OK)

    def post(self, request):
        '''
        사진 업로드
        '''
        # TODO: email 부분 request.user 로 바꾸기
        user = get_object_or_404(User, email="test@test.com")
        food = get_object_or_404(Food, name=request.data["food_name"])

        serializers = FoodImageSerializer(data=request.data)
        serializers.is_valid()

        validated_data = serializers.validated_data

        foodimage = FoodImage()
        print(user, food)
        foodimage.user = user
        foodimage.food = food
        foodimage.date = validated_data["date"]
        foodimage.memo = validated_data["memo"]
        foodimage.image = validated_data["image"]

        foodimage.save()

        return Response(status.HTTP_200_OK)


class search(APIView):
    '''
    음식이름 검색
    '''
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        search_word = request.data["word"]
        food_search = Food.objects.filter(
            name__icontains=search_word).all()[:10]

        serializer = FoodSerializer(food_search, many=True)

        list = []
        for names in serializer.data:
            list.append(names['name'])

        response = {"search_result": list}
        return Response(response)


class eaten_update(APIView):
    '''
    먹은 음식 상세 정보 수정
    '''
    pass


class nutrient(APIView):
    '''
    음식 영양소 정보 불러오기
    '''
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        food = Food.objects.filter(name=request.data["food_name"]).first()
        serializers = FoodSerializer(food)
        response = serializers.data
        return Response(response)
