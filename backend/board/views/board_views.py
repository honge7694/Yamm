from rest_framework import serializers, status, permissions, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import ValidationError

from ..models import Post, PostReaction
from ..serializers import PostReactionSerializer, PostSerializer, PostImageSerializer
from config.permission import IsOwnerOrReadOnly 


class PostWrite(generics.CreateAPIView):
    '''
    게시글 업로드
    '''
    # permission_classes = [IsAuthenticated, ]
    permission_classes = [permissions.AllowAny ]

    serializer_class = PostSerializer
    queryset = Post.objects.all()


class PostList(generics.ListCreateAPIView):
    '''
    게시글 목록
    '''
    permission_classes = [permissions.AllowAny ]

    serializer_class = PostSerializer
    queryset = Post.objects.all().order_by('-create_date')


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    '''
    게시글 업데이트, 디테일, 삭제
    '''
    # permission_classes = [IsOwnerOrReadOnly]
    permission_classes = [permissions.AllowAny ]

    serializer_class = PostSerializer
    queryset = Post.objects.all()


class PostReactionCreate(generics.ListCreateAPIView):
    '''
    게시글 추천
    '''

    permission_classes = [permissions.AllowAny ]

    serializer_class = PostReactionSerializer
    # queryset = PostReaction.

    def get_queryset(self):
        user = self.request.user
        print(user,"####################")
        post = Post.objects.get(pk=self.kwargs['pk'])
        return PostReaction.objects.filter(user=user, post=post)

    def perform_create(self, serializer, *args, **kwargs):
        if self.get_queryset().exists():
            self.get_queryset().delete()

            return Response(status=status.HTTP_204_NO_CONTENT)
        
        serializer.save(user=self.request.user, post=Post.objects.get(pk=self.kwargs['pk']))

    def delete(self, serializer, *args, **kwargs):
        if self.get_queryset().exists():
            self.get_queryset().delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        serializer.save(user=self.request.user, post=Post.objects.get(pk=self.kwargs['pk']))
        # else:
        #     raise ValidationError("Not reaction for post")