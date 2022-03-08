from rest_framework import serializers
from board.models import Post, PostImage, ImageTes


class PostImageSerializer(serializers.ModelSerializer):
    img = serializers.ImageField(use_url=True)

    class Meta:
        model = PostImage
        fields = ['img']

class PostSerializer(serializers.ModelSerializer):
    # images = PostImageSerializer(many=True, read_only=True)
    images = serializers.SerializerMethodField()

    def get_images(self, obj):
        image = obj.imagekey.all()
        return PostImageSerializer(instance=image, many=True).data
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'create_date', 'author', 'images',]
    
    def create(self, validated_data):
        images_data = self.context['request'].FILES
        post = Post.objects.create(**validated_data)

        for image_data in images_data.getlist('img'):
            PostImage.objects.create(post=post, img=image_data)

        return post


class ImageTesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageTes
        fields = '__all__'