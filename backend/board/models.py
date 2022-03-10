from django.db import models
from user.models import User
from django.db.models.fields.related import ForeignKey


class Post(models.Model):
    author = ForeignKey(User, on_delete=models.CASCADE, db_column='author')
    title = models.CharField(max_length=100)
    content = models.TextField()
    create_date = models.DateTimeField()
    modify_date = models.DateTimeField(null=True, blank=True)
    tags = models.CharField(max_length=100, null=True)
    # reaction = models.ManyToManyField(User, related_name='reaction_post') # 추천
    user_info = models.CharField(max_length=100)


class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, db_column='post_id', related_name='imagekey')
    img = models.ImageField(upload_to="images/post/", blank=True, null=True)


class PostReaction(models.Model):
    user = ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    post = ForeignKey(Post, on_delete=models.CASCADE, db_column='board_id')