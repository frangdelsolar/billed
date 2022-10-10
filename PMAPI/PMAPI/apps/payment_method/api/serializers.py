from rest_framework.serializers import (
    HyperlinkedModelSerializer,
    SerializerMethodField,
    Serializer
)
from payment_method.models import PaymentMethod


class PaymentMethodSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = PaymentMethod
        fields = [
            'id',
            'name',
            'description'
        ]
