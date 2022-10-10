from locale import currency
from django.db import models
from system_details.models import Metadata


class CurrencyField(Metadata):
    amount = models.DecimalField(max_digits=1000, decimal_places=2)
    currency = models.CharField(
        max_length=120, blank=False, null=False, default='ars')
    exchange_rate = models.DecimalField(max_digits=1000,
                                        decimal_places=2, default=1, blank=True, null=True)
