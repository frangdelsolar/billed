from django.db import models
from django.contrib.auth import get_user_model


class Profile(models.Model):
    user = models.OneToOneField(
        get_user_model(), on_delete=models.CASCADE, primary_key=True)
    settings = models.OneToOneField(
        'user_settings.UserSettings', on_delete=models.CASCADE)
