from django.urls import path, include
from rest_framework import routers

from .views import CategoryViewSet, MoveCategoryView


app_name = 'category-api'

router = routers.DefaultRouter()
router.register(r'category', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('category/<int:pk>/move', MoveCategoryView.as_view(), name="balance-api"),

]
