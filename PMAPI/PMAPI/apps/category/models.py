from django.db import models

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
