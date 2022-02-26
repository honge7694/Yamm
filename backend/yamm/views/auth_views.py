import json

from django.http import HttpResponse, JsonResponse

from argon2 import PasswordHasher # 암호화

from django.http import HttpResponse
from ..models import User
# from django.core import serializers # json으로 데이터 보내기.

# from rest_framework import viewsets

# DRF(Django-rest-framework)
# from ..serializers import UserSerializer



# class UserView(viewsets.ModelViewSet):
#     # api 문서
#     serializer_class = UserSerializer
#     queryset = User.objects.all()


def user_email(request):
    '''
    이메일 검사
    '''

    # FE -> BE로 데이터 전달 받음.
    if request.method == 'POST':
        user = json.loads(request.body)
        user_email = user['email']

        # email 중복 확인
        same_email = User.objects.filter(email = user_email).first()

        if same_email:
            print("이미 존재하는 email 입니다.")

            return JsonResponse({
                    "result": "fail",
                    "content": "이미 존재하는 email 입니다.",
                    "status": 401
                })
        else:
            print("사용가능한 email 입니다.")

            return JsonResponse({
                    "result": "success",
                    "content": "사용 가능한 email입니다.",
                    "status": 200
                })

def user_nickname(request):
    '''
    닉네임 검사
    '''
    if request.method == 'POST':
        user = json.loads(request.body)
        user_nickname = user['nickname']

        same_nickname = User.objects.filter(nickname = user_nickname).first()

        if same_nickname:
            print("이미 존재하는 nickname 입니다.")

            return JsonResponse({
                "result": "fail",
                "content": "이미 존재하는 nickname 입니다.",
                "status": 401
            })
        else:
            print("사용 가능한 nickname입니다.")

            return JsonResponse({
                "result": "success",
                "content": "사용 가능한 nickname입니다.",
                "status": 200
            })


def user_signup(request):
    '''
    유저 추가
    '''
    # FE -> BE로 데이터 전달 받음.
    if request.method == 'POST':
        user = json.loads(request.body)

        if user != None :
            email = user['email']
            password = user['password']
            nickname = user['nickname']
            taste = user['taste']
            number = number['number']

            # password 암호화
            pw_hash = PasswordHasher().hash(password)
        
            user_info = User(email=email, password=pw_hash, nickname=nickname, taste=taste, number=number)
            user_info.save()

            return JsonResponse({
                "result": "success",
                "content": "가입 성공",
                "status": 200
            })
    
    users = User.objects.all()
    users_serialized = json.loads(serializers.serialize('json', users, ensure_ascii=False))

    return JsonResponse(users_serialized, safe=False)


def user_signin(request):
    '''
    로그인
    '''
    # FE -> BE로 데이터 전달 받음.
    if request.method == 'POST':
        user = json.loads(request.body)

        if user != None:
            user_email = user['email']
            user_pw = user['password']

            # DB에 email이 있는지 확인.
            same_user = User.objects.filter(email=user_email).first()

            if not same_user:
                print("가입된 회원이 아닙니다.")

                return JsonResponse({
                    "result": "fail",
                    "content": "가입된 회원이 아닙니다.",
                    "status": 401
                })
            elif not PasswordHasher.verify(same_user.password ,user_pw):
                print("비밀번호를 확인해주세요.")

                return JsonResponse({
                    "result": "fail",
                    "content": "비밀번호를 확인해주세요.",
                    "status": 401
                })
            else:
                print("Login 성공!")

                # 세션 삭제.
                del request.session['user_id']

                request.session['user_id'] = same_user.email


                return JsonResponse({
                    "result": "success",
                    "content": "로그인 성공하였습니다.",
                    "status": 200
                })

def user_logout(request):
    del request.session['user_id']
    return 'home page'