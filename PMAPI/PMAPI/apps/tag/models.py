from django.db import models
from system_details.models import Metadata


class Tag(Metadata):
    """
    User can define its own category
    """
    name = models.CharField(max_length=120, blank=False, null=False)
    color = models.CharField(max_length=120, blank=False,
                             null=False, default='white')
    icon = models.CharField(max_length=120, blank=False,
                            null=False, default='tag')


class TagItem(Metadata):
    """
    Tag Items for user category
    """
    tag = models.ForeignKey(Tag, on_delete=models.SET_NULL)
    name = models.CharField(max_length=120, blank=False, null=False)
