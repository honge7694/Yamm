import json

from django.http import JsonResponse

from ..models import User, FoodInfo, FoodImage, FoodImageInfo


def upload(request):
    '''
    사진 업로드
    '''
    if request.method == 'POST':
        form = FoodImage()
        form.image = request.FILES['img']
        form.save()

        obj = FoodImage.objects.last()
        img_id = obj.id

        return JsonResponse({
            "img_id": img_id,
            "status": 200
        })


def upload_info(request):
    '''
    사진 정보 업로드
    '''
    if request.method == 'POST':
        req = json.loads(request.body)
        email = req['email']
        name = req['name']
        img_id = req['img_id']
        date = req['date']
        memo = req['memo']

        UserObj = User.objects.filter(email=email).first()
        user_id = UserObj.id
        FoodObj = FoodInfo.objects.filter(name=name).first()
        food_id = FoodObj.id

        form = FoodImageInfo()
        form.user_id = user_id
        form.food_id = food_id
        form.img_id = img_id
        form.date = date
        form.memo = memo
        form.save()

        return JsonResponse({
            "status": 200
        })
