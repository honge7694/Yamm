from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions

# from ..ai_model.model_linked_with_Django import inputdata
# from ..models import Food

# import cv2
# import numpy


class distinction(APIView):
    '''
    사진 판별
    '''
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        image = request.FILES['image']
        # image = cv2.imdecode(numpy.frombuffer(
        #     image.read(), numpy.uint8), cv2.IMREAD_UNCHANGED)
        # confidence, label = inputdata(image)

        # food = Food.objects.filter(pk=label-1).first()

        # food_name = food.name

        response = {"food_name": "돈가스"}
        return Response(response, status.HTTP_200_OK)
