from currency_field.serializers import CurrencySerializer
from category.api.serializers import CategorySerializer
from rest_framework.serializers import (
    HyperlinkedModelSerializer,
    SerializerMethodField,
    Serializer,
    ModelSerializer
)
from payment_item.models import PaymentItem, RecurrentPayment


class PaymentItemSerializer(ModelSerializer):
    category = CategorySerializer()
    currency = CurrencySerializer()
    recurrent = SerializerMethodField()

    class Meta:
        model = PaymentItem
        fields = [
            'id',
            'description',
            'currency',
            'category',
            'recurrent'
        ]

    def get_recurrent(self, obj):
        return RecurrentPayment.objects.filter(payment_item=obj).count() > 0
