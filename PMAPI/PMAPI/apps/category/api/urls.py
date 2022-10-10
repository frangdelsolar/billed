from django.urls import path, include
from rest_framework import routers

from .views import CategoryViewSet


app_name = 'category-api'

router = routers.DefaultRouter()
router.register(r'category', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
