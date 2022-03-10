from django.db import models
from user.models import User


class Food(models.Model):
    name = models.CharField(max_length=100)
    carb = models.FloatField()
    protein = models.FloatField()
    fat = models.FloatField()
    calorie = models.FloatField()

    class Meta:
        db_table = 'food'


class FoodImage(models.Model):
    user = models.ForeignKey(User, related_name="food_image_infos",
                             on_delete=models.CASCADE, db_column='user_id')
    food = models.ForeignKey(Food, related_name="food_image_infos",
                             on_delete=models.CASCADE, db_column='food_id')
    date = models.DateTimeField()
    memo = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='images/food/')

    class Meta:
        db_table = 'food_image'
