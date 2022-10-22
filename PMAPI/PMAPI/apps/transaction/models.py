from gettext import install
from django.db import models

from .utils.create_recurrency_for_transaction import create_recurrency_for_transaction
from .utils.create_installment_for_transaction import create_installment_for_transaction

from payment_item.models import RecurrentPayment
from payment_item.models import PaymentItem
from system_details.models import Metadata
from currency_field.models import CurrencyField
from category.models import Category

from decimal import Decimal

TRANSACTION_TYPES = [
    ('income', 'Ingreso'),
    ('expense', 'Gasto')
]

CURRENCIES = [
    ('ars', 'Peso Argentino'),
    ('usd', 'Dólar Estadounidense')
]


class Transaction(Metadata):
    payment_item = models.ForeignKey(
        'payment_item.PaymentItem', on_delete=models.CASCADE)
    type = models.CharField(choices=TRANSACTION_TYPES, max_length=120)
    currency = models.OneToOneField(
        'currency_field.CurrencyField', on_delete=models.CASCADE, blank=False, null=False)
    date_of_transaction = models.DateTimeField()
    description = models.CharField(max_length=120, null=False, blank=False)
    notes = models.CharField(max_length=500, null=True, blank=True)
    completed = models.BooleanField(default=False)
    installment = models.ForeignKey(
        'payment_item.Installment', on_delete=models.CASCADE, blank=True, null=True)
    recurrent = models.ForeignKey(
        'payment_item.RecurrentPayment', on_delete=models.SET_NULL, blank=True, null=True)

    @classmethod
    def create(self, *args, **kwargs):
        """
        accepted kwargs:
        payment_item, amount, currency, exchange_rate, 
        category, type, date_of_transaction, description, 
        notes, completed, ignore, recurrent, convert, 
        repeats, repetitions, frequency, parent_transaction
        """
        convert = kwargs.pop('convert')
        amount = kwargs.pop('amount')
        currency = kwargs.pop('currency')
        exchange_rate = kwargs.pop('exchange_rate')
        payment_item = kwargs.get('payment_item')
        create_recurrent = kwargs.pop('create_recurrent')
        recurrent_payment = kwargs.pop('recurrent')
        repeats = kwargs.pop('repeats')
        repetitions = kwargs.pop('repetitions')
        frequency = kwargs.pop('frequency')
        category = kwargs.pop('category')

        if not 'payment_item' in kwargs or payment_item is None:
            payment_item = PaymentItem.create(
                description=kwargs['description'],
                notes=kwargs['notes'],
                amount=amount,
                currency=currency,
                exchange_rate=exchange_rate,
                category=Category.objects.get(id=category)
            )
            kwargs['payment_item'] = payment_item

        if convert == True:
            amount = Decimal.from_float(float(amount)*float(exchange_rate))
            currency = 'ARS'

        cf = CurrencyField.objects.create(
            amount=amount,
            currency=currency,
            exchange_rate=exchange_rate
        )
        kwargs['currency'] = cf

        instance = self.objects.create(**kwargs)

        if create_recurrent:
            create_recurrency_for_transaction(instance, payment_item)

        if recurrent_payment:
            instance.recurrent = recurrent_payment
            instance.save()

        if repeats:
            create_installment_for_transaction(
                instance, repetitions, frequency)

        return instance
