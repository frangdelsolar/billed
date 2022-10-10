from django.urls import path, include
from rest_framework import routers

from .views import PaymentItemViewSet


app_name = 'payment-item-api'

router = routers.DefaultRouter()
router.register(r'payment-item', PaymentItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
