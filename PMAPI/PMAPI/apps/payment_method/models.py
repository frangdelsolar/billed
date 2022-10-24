from django.db import models
from system_details.models import Metadata


class Account(Metadata):
    name = models.CharField(max_length=120, null=False, blank=False)
    description = models.CharField(max_length=500, null=False, blank=False)
    bank = models.CharField(max_length=120, null=False, blank=False)


class CreditCard(Metadata):
    name = models.CharField(max_length=120, null=False, blank=False)
    description = models.CharField(max_length=500, null=False, blank=False)
    account = models.ForeignKey(
        Account, on_delete=models.SET_NULL, blank=True, null=True)
    close_date = models.IntegerField()
    expiry_date = models.IntegerField()
    limit = models.FloatField()
