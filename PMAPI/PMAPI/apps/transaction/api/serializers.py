from rest_framework.serializers import ModelSerializer, SerializerMethodField
from transaction.models import Transaction
from payment_item.api.serializers import PaymentItemSerializer, InstallmentSerializer, RecurrentSerializer


class TransactionSerializer(ModelSerializer):
    currency = SerializerMethodField()
    amount = SerializerMethodField()
    payment_item = PaymentItemSerializer()
    installment = InstallmentSerializer()
    recurrent = RecurrentSerializer()

    class Meta:
        model = Transaction
        fields = [
            'id',
            'created_by',
            'date_created',
            'updated_by',
            'last_update',
            'payment_item',
            'type',
            'currency',
            'amount',
            'date_of_transaction',
            'description',
            'completed',
            'notes',
            'installment',
            'recurrent',
        ]

    def get_currency(self, obj):
        return obj.currency.currency

    def get_amount(self, obj):
        return obj.currency.amount
