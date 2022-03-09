from rest_framework import serializers
from board.models import Post, PostImage, PostReaction
from user.models import User


class PostImageSerializer(serializers.ModelSerializer):
    '''
    게시글 이미지
    '''
    img = serializers.ImageField(use_url=True)

    class Meta:
        model = PostImage
        fields = ['img']


class PostReactionSerializer(serializers.ModelSerializer):
    '''
    추천
    '''
    class Meta:
        model = PostReaction
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    '''
    게시글
    '''
    images = serializers.SerializerMethodField()
    user_info = serializers.SerializerMethodField()
    reaction = serializers.SerializerMethodField()

    def get_images(self, obj):
        image = obj.imagekey.all()
        return PostImageSerializer(instance=image, many=True).data

    def get_user_info(self, obj):
        return User.objects.filter(username=obj.author).values('nickname', 'username', 'profile_img')

    def get_reaction(self, obj):
        return PostReaction.objects.filter(id=obj.id).count()

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'create_date', 'images', 'tags', 'author', 'user_info', 'reaction']
    
    def create(self, validated_data):
        images_data = self.context['request'].FILES
        post = Post.objects.create(**validated_data)

        for image_data in images_data.getlist('img'):
            PostImage.objects.create(post=post, img=image_data)

        return post
