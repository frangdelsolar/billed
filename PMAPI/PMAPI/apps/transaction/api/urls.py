from django.urls import path, include
from rest_framework import routers

from .views import BalanceView, TransactionViewSet, PayView, CSVHandlerView, HistoricalView


app_name = 'transaction-api'

router = routers.DefaultRouter()
router.register(r'transaction', TransactionViewSet)

urlpatterns = [
    path('balance/', BalanceView.as_view(), name="balance-api"),
    path('historical/', HistoricalView.as_view(), name="historical-api"),
    path('pay/<int:pk>', PayView.as_view(), name="pay-api"),
    path('transaction-csv', CSVHandlerView.as_view(), name="csv-api"),
]
urlpatterns += router.urls
