from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions


class distinction(APIView):
    '''
    사진 판별
    '''
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        image = request.FILES['image']

        # TODO: AI 연동 후 음식 이름 반환
        food_name = '돈까스'

        response = {"food_name": food_name}
        return Response(response, status.HTTP_200_OK)
