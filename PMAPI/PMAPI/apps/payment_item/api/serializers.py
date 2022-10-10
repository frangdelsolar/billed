from currency_field.serializers import CurrencySerializer
from category.api.serializers import CategorySerializer
from rest_framework.serializers import (
    HyperlinkedModelSerializer,
    SerializerMethodField,
    Serializer,
    ModelSerializer
)
from payment_item.models import PaymentItem


class PaymentItemSerializer(ModelSerializer):
    category = CategorySerializer()
    currency = CurrencySerializer()

    class Meta:
        model = PaymentItem
        fields = [
            'id',
            'description',
            'currency',
            'category'
        ]
