from currency_field.serializers import CurrencySerializer
from category.api.serializers import CategorySerializer
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from payment_item.models import PaymentItem, Installment, RecurrentPayment


class PaymentItemSerializer(ModelSerializer):
    category = CategorySerializer()
    currency = CurrencySerializer()

    class Meta:
        model = PaymentItem
        fields = [
            'id',
            'description',
            'currency',
            'category',
        ]


class InstallmentSerializer(ModelSerializer):

    class Meta:
        model = Installment
        fields = [
            'id',
            'frequency',
            'repetitions',
        ]


class RecurrentSerializer(ModelSerializer):
    since = SerializerMethodField()

    class Meta:
        model = RecurrentPayment
        fields = [
            'id',
            'payment_item',
            'since'
        ]

    def get_since(self, obj):
        return obj.payment_item.date_created
