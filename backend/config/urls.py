from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

# from rest_framework import routers
from yamm.views import auth_views

# router = routers.DefaultRouter()
# router.register('user', auth_views.UserView, 'user')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('yamm/', include('yamm.urls')),

    # # Django REST framework
    # path('api/', include(router.urls)),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
