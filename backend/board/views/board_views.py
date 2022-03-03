from rest_framework import serializers, status, permissions, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Post, PostImage, ImageTes 
from ..serializers import PostSerializer, PostImageSerializer, ImageTesSerializer

class PostList(APIView):
    
    # permission_classes = (IsAuthenticated, )
    permission_classes = [permissions.AllowAny]
    
    # serializers_class =PostSerializer()

    # def get(self, request):
    #     serializers = PostSerializer()

    def post(self, request):
        serializers = PostSerializer(data=request.data, context={"request": request})
        if serializers.is_valid():
            serializers.save(user=self.request.user)
            return Response(serializers.data, status.HTTP_201_CREATED)
        

        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class ImageTes(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    serializer_class = ImageTesSerializer
    queryset = ImageTes.objects.all()