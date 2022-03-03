from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('yamm/', include('yamm.urls')),
    path('board/', include('board.urls')),
]
