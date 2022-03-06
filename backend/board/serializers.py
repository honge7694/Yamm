from rest_framework import serializers
from board.models import Post, PostImage, ImageTes


class PostImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = PostImage
        fields = ['image']


# class PostSerializer(serializers.ModelSerializer):
#     images = serializers.SerializerMethodField("get_images")

#     def get_images(self, obj):
#         image = obj.postimage_set.all()
        
#         return PostImageSerializer(instance=image, many=True, context=self.context).data


#     def create(self, validated_data):
#         instance = Post.objects.create(**validated_data)
#         image_set = self.context['request'].FILES

#         for image_data in image_set.getlist('image'):
#             PostImage.objects.create(post=instance, image=image_data)
        
#         return instance

#     class Meta:
#         model = Post
#         fields = ['id', 'title', 'content', 'create_date', 'images']

class PostSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True, required=False)
    # img = serializers.SerializerMethodField()
    # hits = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'create_date', 'images', 'author', ]
    
    # def get_img(self, obj):
    #     parent_comments = obj.imagekey.all()
    #     serializer = PostImageSerializer(parent_comments, many=True)

    #     return serializer.data

    def get_hits(self, obj):
        try:
            return obj.hit_count.hits
        except:
            pass

    def create(self, validated_data):
        images_data = self.context['request'].FILES
        post = Post.objects.create(**validated_data)
        
        for image_data in images_data.getlist('image'):
            PostImage.objects.create(post=post, image=image_data)
        
        return post

class ImageTesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageTes
        fields = '__all__'