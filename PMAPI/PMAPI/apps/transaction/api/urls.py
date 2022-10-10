from django.urls import path, include
from rest_framework import routers

from .views import BalanceView, TransactionViewSet


app_name = 'transaction-api'

router = routers.DefaultRouter()
router.register(r'transaction', TransactionViewSet)

urlpatterns = [
    path('balance', BalanceView.as_view(), name="balance-api"),
]
urlpatterns += router.urls
