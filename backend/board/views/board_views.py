from rest_framework import serializers, status, permissions, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import ValidationError

from ..models import Post, PostReaction
from ..serializers import PostReactionSerializer, PostSerializer, PostImageSerializer
from config.permission import IsOwnerOrReadOnly


class PostListAPIView(generics.ListCreateAPIView):
    '''
    게시글 생성, 목록
    '''
    permission_classes = [permissions.AllowAny]

    serializer_class = PostSerializer
    queryset = Post.objects.all()

    # def get_queryset(self):
    #     order = self.request.data('', 'recent')

    #     # order = 'recent'
    #     if order == 'recent':
    #         return Post.objects.all()

    #     elif order == 'popular':
    #         return Post.objects.all().order_by()


class PostRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    '''
    게시글 수정, 조회, 삭제
    '''
    # permission_classes = [IsOwnerOrReadOnly]
    permission_classes = [permissions.AllowAny]

    serializer_class = PostSerializer
    queryset = Post.objects.all()


class PostReactionAPIView(generics.ListCreateAPIView):
    '''
    게시글 추천
    '''

    permission_classes = [permissions.AllowAny]

    serializer_class = PostReactionSerializer

    def get_queryset(self):
        user = self.request.user

        post = Post.objects.get(pk=self.kwargs['pk'])
        return PostReaction.objects.filter(user=user, post=post)

    def perform_create(self, serializer, *args, **kwargs):
        if self.get_queryset().exists():
            self.get_queryset().delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        serializer.save(user=self.request.user,
                        post=Post.objects.get(pk=self.kwargs['pk']))

    def delete(self, serializer, *args, **kwargs):
        if self.get_queryset().exists():
            self.get_queryset().delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        # serializer.save(user=self.request.user, post=Post.objects.get(pk=self.kwargs['pk']))
        # else:
            # raise ValidationError("Not reaction for post")
