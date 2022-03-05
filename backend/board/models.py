from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from yamm.models import User

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_post', db_column='author')
    title = models.CharField(max_length=100)
    content = models.TextField()
    create_date = models.DateTimeField()
    modify_date = models.DateTimeField(null=True, blank=True)
    reaction = models.ManyToManyField(User, related_name='reaction_post')

class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, db_column='post_id', related_name='imagekey')
    img = models.ImageField(upload_to="images/post/", blank=True, null=True)

class ImageTes(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(blank=True, null=True, upload_to='images/')

    def __str__(self):
        return self.title
