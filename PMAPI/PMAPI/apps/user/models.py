from django.db import models
from django.contrib.auth import get_user_model
from category.initial_setup import initialize_categories
from user_settings.models import UserSettings

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
