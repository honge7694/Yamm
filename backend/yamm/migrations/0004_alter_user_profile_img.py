# Generated by Django 4.0.2 on 2022-03-06 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yamm', '0003_user_profile_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_img',
            field=models.ImageField(blank=True, null=True, upload_to='user'),
        ),
    ]
