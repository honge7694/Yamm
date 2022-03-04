from rest_framework import serializers, status, permissions, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Post, PostImage, ImageTes 
from ..serializers import PostSerializer, PostImageSerializer, ImageTesSerializer

class PostList(generics.CreateAPIView):
    # permission_classes = (IsAuthenticated, )
    permission_classes = [permissions.AllowAny]

    serializer_class = PostSerializer
    queryset = Post.objects.all()

class ImageTes(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    serializer_class = ImageTesSerializer
    queryset = ImageTes.objects.all()