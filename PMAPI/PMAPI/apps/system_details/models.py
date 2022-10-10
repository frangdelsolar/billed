from tabnanny import verbose
from django.db import models
from django.contrib.auth import get_user_model
from .middlewares import CurrentUserMiddleware
import datetime


class Metadata(models.Model):
    created_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.SET_NULL,
        related_name="%(app_label)s_%(class)s_created",
        null=True, blank=True,
        verbose_name="Created By")
    updated_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.SET_NULL,
        related_name="%(app_label)s_%(class)s_updated",
        null=True, blank=True,
        verbose_name="Updated By")
    date_created = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    @staticmethod
    def get_current_user():
        return CurrentUserMiddleware.get_current_user()

    def set_user_fields(self, user):
        if user and user.pk:
            if not self.pk:
                self.created_by = user
            self.updated_by = user

    def save(self, *args, **kwargs):
        self.last_update = datetime.datetime.now()
        current_user = self.get_current_user()
        self.set_user_fields(current_user)
        super(Metadata, self).save(*args, **kwargs)
