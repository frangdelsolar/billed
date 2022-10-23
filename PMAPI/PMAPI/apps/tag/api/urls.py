from django.urls import path, include
from rest_framework import routers

from .views import TagViewSet


app_name = 'tag-api'

router = routers.DefaultRouter()
router.register(r'tag', TagViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
