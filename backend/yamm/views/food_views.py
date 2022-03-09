from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from datetime import datetime

from ..models import User, Food, FoodImage
from ..serializers import FoodSerializer, FoodImageSerializer


# TODO: permission 연동되면 수정하기

class eaten(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        '''
        먹은 음식 리스트 불러오기
        '''
        date = datetime.strptime(request.data["date"], '%Y-%m-%d')

        # TODO: user_id 하드코딩
        food_image = FoodImage.objects.filter(user_id=1)
        food_image = food_image.filter(
            date__year=date.year, date__month=date.month, date__day=date.day).order_by("date")
        serializer = FoodImageSerializer(food_image, many=True)
        req_list = []
        if serializer.data:
            req_list.append({'carb': 0, 'protein': 0, 'fat': 0, 'calorie': 0})
            req_list.append(list())

            old_date = datetime.strptime(
                serializer.data[0]["date"], '%Y-%m-%dT%H:%M:%S')
            i = 1
            for obj in serializer.data:
                dict = {}

                food = Food.objects.filter(id=obj["food_id"]).first()

                req_list[0]['carb'] += food.carb
                req_list[0]['protein'] += food.protein
                req_list[0]['fat'] += food.fat
                req_list[0]['calorie'] += food.calorie

                dict["id"] = obj["pk"]
                dict["date"] = obj["date"]
                dict["image"] = obj["image"]
                dict["food_name"] = food.name
                dict["memo"] = obj["memo"]

                now_date = datetime.strptime(obj["date"], '%Y-%m-%dT%H:%M:%S')
                d = now_date - old_date
                if d.seconds / 3600 >= 1.0:
                    i += 1
                    req_list.append(list())
                req_list[i].append(dict)
                old_date = now_date

        response = req_list
        return Response(response, status.HTTP_200_OK)

    def post(self, request):
        '''
        사진 업로드
        '''
        # TODO: email 부분 request.user 로 바꾸기
        food = get_object_or_404(Food, name=request.data["food_name"])
        user = get_object_or_404(User, id=1)
        data = {
            "user_id": user,
            "food_id": food,
            "date": request.data["date"],
            "memo": request.data["memo"],
            "image": request.FILES["image"],
        }
        print(data)
        serializer = FoodImageSerializer(data=data)
        if serializer.is_valid():  # 유효성 검사
            serializer.save()  # 저장
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        foodimage = FoodImage.objects.get(pk=request.data["id"])
        data = {
            "image": foodimage.image,
            "user_id": foodimage.user_id,
            "food_id": get_object_or_404(Food, name=request.data["food_name"]),
            "date": request.data["date"],
            "memo": request.data["memo"],
        }
        serializer = FoodImageSerializer(foodimage, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        foodimage = FoodImage.objects.get(pk=request.data["id"])
        foodimage.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
