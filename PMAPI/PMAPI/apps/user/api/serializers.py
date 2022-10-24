from rest_framework.serializers import ModelSerializer, SerializerMethodField
from user.models import Profile, TransactionReport


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


class TransactionReportSerializer(ModelSerializer):
    file = SerializerMethodField()

    class Meta:
        model = TransactionReport
        fields = [
            'id',
            'file',
            'description'
        ]

    def get_file(self, obj):
        return obj.file.url
