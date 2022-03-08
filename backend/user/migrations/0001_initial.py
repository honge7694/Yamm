# Generated by Django 4.0.2 on 2022-03-07 10:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(default='', max_length=100, unique=True)),
                ('name', models.CharField(default='', max_length=100)),
                ('nickname', models.CharField(default='', max_length=100, unique=True)),
                ('phonenumber', models.CharField(default='', max_length=100, unique=True)),
                ('taste', models.CharField(blank=True, max_length=100, null=True)),
                ('profile_img', models.ImageField(blank=True, null=True, upload_to='user')),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'user',
            },
        ),
    ]