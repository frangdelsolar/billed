from django.db import models
from currency_field.models import CurrencyField
from system_details.models import Metadata

CURRENCIES = [
    ('ars', 'Peso Argentino'),
    ('usd', 'Dólar Estadounidense')
]

TRANSACTION_TYPES = [
    ('income', 'Ingreso'),
    ('expense', 'Gasto')
]


class PaymentItem(Metadata):
    description = models.CharField(max_length=500, null=False, blank=False)
    currency = models.OneToOneField(
        'currency_field.CurrencyField', on_delete=models.CASCADE, blank=False, null=False)
    category = models.ForeignKey(
        'category.Category', on_delete=models.CASCADE, null=True, blank=True)

    @classmethod
    def create(self, *args, **kwargs):
        amount = kwargs.pop('amount')
        currency = kwargs.pop('currency')
        exchange_rate = kwargs.pop('exchange_rate')

        cf = CurrencyField.objects.create(
            amount=amount,
            currency=currency,
            exchange_rate=exchange_rate
        )
        kwargs['currency'] = cf
        return self.objects.create(**kwargs)


class RecurrentPayment(Metadata):
    payment_item = models.ForeignKey(
        'payment_item.PaymentItem', on_delete=models.CASCADE, related_name="recurrents")
    payment_type = models.CharField(choices=TRANSACTION_TYPES, max_length=120)
