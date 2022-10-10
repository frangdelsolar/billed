from rest_framework.serializers import (
    HyperlinkedModelSerializer,
    SerializerMethodField,
    Serializer,
    ModelSerializer
)
from .models import CurrencyField


class CurrencySerializer(ModelSerializer):

    class Meta:
        model = CurrencyField
        fields = [
            'id',
            'amount',
            'currency',
            'exchange_rate'
        ]
