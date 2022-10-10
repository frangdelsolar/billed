from django.db import models
from system_details.models import Metadata


class PaymentMethod(Metadata):
    name = models.CharField(max_length=120, null=False, blank=False)
    description = models.CharField(max_length=500, null=False, blank=False)
