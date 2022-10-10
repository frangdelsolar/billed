from django.urls import path, include
from rest_framework import routers

from .views import PaymentMethodViewSet


app_name = 'payment-method-api'

router = routers.DefaultRouter()
router.register(r'payment-method', PaymentMethodViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
