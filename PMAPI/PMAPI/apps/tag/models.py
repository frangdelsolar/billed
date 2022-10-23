from django.db import models
from requests import delete
from system_details.models import Metadata


class Tag(Metadata):
    name = models.CharField(max_length=120, blank=False, null=False)
