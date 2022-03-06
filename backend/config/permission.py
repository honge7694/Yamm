from django.contrib.auth import get_user_model
from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnerOrReadOnly(BasePermission):
    '''
    작성자만 접근, 작성자가 아니면 Read
    '''
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            if request.method in SAFE_METHODS:
                return True
            # 댓글 만들때 사용.
            elif hasattr(obj, 'profile'):
                return obj.profile.id == request.user.id
            elif obj.__class__ == get_user_model():
                return obj.id == request.user.id
            
            return False
        else:
            return False