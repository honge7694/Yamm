from django.db import models

class User(models.Model):
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=300)
    nickname = models.CharField(max_length=200)
    taste = models.CharField(max_length=200)
    number = models.CharField(max_length=200)
    # profile = models.ImageField(blank=True)

    def __str__(self):
        return "이메일: {}, 닉네임: {}, 취향: {}, 번호: {}".format(self.email, self.nickname, self.taste, self.number)

    class Meta:
        db_table = 'tb_user_info'