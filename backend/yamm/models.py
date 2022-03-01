from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    # 일반 user 생성
    def create_user(self, email, name, nickname, number, password=None, **extra_fields):
        if not email:
            raise ValueError('must have user email')
        if not name:
            raise ValueError('must have user name')
        if not nickname:
            raise ValueError('must have user nickname')
        if not number:
            raise ValueError('must have user number')
        
        user = self.model(
            email = self.normalize_email(email),
            name = name,
            nickname = nickname,
            number = number,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    # 관리자 user 생성
    def create_superuser(self, email, name, nickname, number, password=None, **extra_fields):
        user = self.model(
            email,
            password = password,
            name = name,
            nickname = nickname,
            number = number,
            **extra_fields
        )

        user.is_admin = True
        user.save(using=self._db)

        return user

class User(AbstractBaseUser):
    #id = models.AutoField(primary_key=True)
    email = models.EmailField(default='', max_length=100, null=False, blank=False, unique=True)
    name = models.CharField(default='', max_length=100, null=False, blank=False)
    nickname = models.CharField(default='', max_length=100, null=False, blank=False, unique=True)
    number = models.CharField(default='', max_length=100, null=False, blank=False, unique=True)
    taste = models.CharField(max_length=100, null=True, blank=True)

    # 장고에서 제공하는 User모델의 필수 field
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    # 헬퍼 클래스 사용
    objects = UserManager()

    # 사용자의 username field는 email으로 설정 (unique 속성 필요, email로 로그인)
    USERNAME_FIELD = 'email'

    # 필수로 작성해야 하는 field
    REQUIRED_FIELDS = ['email, name, nickname, number']

    def __str__(self):
        return self.email

    class Meta :
        db_table = 'user'
    
class userLogin(models.Model):
    #로그인 제공자의 회원키
    provider_key = models.CharField(
        max_length=255,
        null=False,
        db_column="providerKey"
    )
    user = models.ForeignKey(
        User, 
        related_name='user_logins', 
        on_delete=models.CASCADE,
        db_column="userId")

    class Meta:
        db_table = "UserLogins"
    