from django.urls import path, include
from rest_framework import routers

from .views import UserViewSet, UsernameValidView


app_name = 'user-api'

router = routers.DefaultRouter()
router.register(r'user', UserViewSet)

urlpatterns = [
    path('user/valid/', UsernameValidView.as_view(), name="username-api"),

]
urlpatterns += router.urls
