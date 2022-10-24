from django.urls import path, include
from rest_framework import routers

from .views import AccountViewSet, CreditCardViewSet


app_name = 'payment-method-api'

router = routers.DefaultRouter()
router.register(r'bank-account', AccountViewSet)
router.register(r'credit-card', CreditCardViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
