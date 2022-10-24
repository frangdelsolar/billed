from django.db import models
from django.contrib.auth import get_user_model
from category.initial_setup import initialize_categories
from user_settings.models import UserSettings
from system_details.models import Metadata

User = get_user_model()


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)

    @classmethod
    def create(self, data):
        user = User.objects.create(
            email=data['email'],
            username=data['username'],
            first_name=data['first_name'],
            last_name=data['last_name'],
        )
        user.set_password(data['password'])
        user.save()

        initialize_categories(user)

        instance = self.objects.create(
            user=user,
        )
        return instance


class FileUpload(Metadata):
    file = models.FileField(upload_to='uploads/')
    description = models.CharField(max_length=200, blank=True, null=True)


class TransactionReport(Metadata):
    file = models.FileField(upload_to='reports/')
    description = models.CharField(max_length=200, blank=True, null=True)
