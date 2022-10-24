from rest_framework.serializers import (
    HyperlinkedModelSerializer,
)
from payment_method.models import Account, CreditCard


class AccountSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = [
            'id',
            'name',
            'description',
            'bank'
        ]


class CreditCardSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CreditCard
        fields = [
            'id',
            'name',
            'description',
            'account',
            'close_date',
            'expiry_date',
            'limit'
        ]
