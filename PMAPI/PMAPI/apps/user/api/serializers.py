from rest_framework.serializers import ModelSerializer, SerializerMethodField
from user.models import Profile


class UserSerializer(ModelSerializer):

    id = SerializerMethodField()
    username = SerializerMethodField()
    email = SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id',
            'username',
            'email'
        ]

    def get_id(self, obj):
        return obj.user.id

    def get_username(self, obj):
        return obj.user.username

    def get_email(self, obj):
        return obj.user.email
