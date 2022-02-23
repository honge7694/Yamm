# 배포할 때 바꾸기.
SECRET_KEY = 'nw90(46%j&3fq1eyws&dxzoh%0)!d80u1dn@caq-gym27dv#g-'

DATABASES = {
    'default' : {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'yamm',
        'USER': 'root',
        'PASSWORD': '1234',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}

ALGORITHM = 'HS256'