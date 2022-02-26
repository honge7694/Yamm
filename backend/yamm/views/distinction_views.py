from django.http import JsonResponse


def distinction(request):
    '''
    사진 판별
    '''
    if request.method == 'POST':
        image = request.FILES['img']

        # TODO: AI 연동 후 음식 이름 반환
        name = '돈까스'

        return JsonResponse({
            "name": name,
            "status": 200
        })
