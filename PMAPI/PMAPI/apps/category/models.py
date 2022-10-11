from django.db import models
from payment_item.models import TRANSACTION_TYPES

from system_details.models import Metadata


class Category(models.Model):
    """
    Categories defined by app admin
    """
    name = models.CharField(max_length=120, blank=False, null=False)
    color = models.CharField(max_length=120, blank=False,
                             null=False, default='white')
    icon = models.CharField(max_length=120, blank=False,
                            null=False, default='tag')
    category_type = models.CharField(
        choices=TRANSACTION_TYPES, max_length=120, blank=False, null=False)
