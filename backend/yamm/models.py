from django.db import models


class User(models.Model):
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    nickname = models.CharField(max_length=100)
    taste = models.CharField(max_length=100)
    number = models.CharField(max_length=100)
    # profile = models.ImageField(blank=True)

    def __str__(self):
        return "이메일: {}, 닉네임: {}, 취향: {}, 번호: {}".format(self.email, self.nickname, self.taste, self.number)

    class Meta:
        db_table = 'tb_user_info'


class FoodImage(models.Model):
    image = models.ImageField(upload_to='images/')

    class Meta:
        db_table = 'tb_food_images'

class FoodImageInfo(models.Model):
    user_id = models.ForeignKey("User", related_name="user", on_delete=models.CASCADE, db_column='user_id')
    food_id = models.ForeignKey("FoodInfo", related_name="food_info", on_delete=models.CASCADE, db_column='food_id')
    img_id = models.ForeignKey("FoodImage", related_name="food_img", on_delete=models.CASCADE, db_column='food_img')
    date = models.DateTimeField()
    memo = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'tb_food_images_info'

class FoodInfo(models.Model):
    name = models.CharField(max_length=100)
    carb = models.FloatField()
    protein = models.FloatField()
    fat = models.FloatField()
    calorie = models.FloatField()

    class Meta:
        db_table = 'tb_food_info'
