from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('api/yamm/', include('yamm.urls')),
    path('api/boards/', include('board.urls')),
    path('api/user/', include('user.urls')),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
