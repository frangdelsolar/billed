from gettext import install
from django.db import models
from payment_item.models import RecurrentPayment
from payment_item.models import PaymentItem, Installment
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
    ignore = models.BooleanField(default=False)
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
            recurrent_payment = RecurrentPayment.objects.create(
                payment_item=payment_item,
                payment_type=instance.type
            )
            instance.recurrent = recurrent_payment

        if recurrent_payment:
            instance.recurrent = recurrent_payment
            instance.save()

        if repeats:
            instance.create_repetitions(repetitions, frequency)

        return instance

    def create_repetitions(self, repetitions, frequency):
        installment = Installment.create(
            payment_item=self.payment_item,
            payment_type=self.type,
            repetitions=repetitions,
            frequency=frequency,
            transaction=self
        )
        self.installment = installment
        self.save()

    def update(self, single=True, future=False, all=False, *args, **kwargs):
        print(kwargs)

    def destroy(self, single=True, future=False, all=False, *args, **kwargs):
        to_delete = []

        if single:
            to_delete = [self]

        if future:
            if self.installment:
                to_delete = self.installment.get_future_transactions(self)
            if self.recurrent:
                to_delete = self.recurrent.get_future_transactions(self)
                self.recurrent.delete()

        if all:
            if self.installment:
                to_delete = self.installment.get_all_transactions()
            if self.recurrent:
                to_delete = self.recurrent.get_all_transactions()
                self.recurrent.delete()

        for item in to_delete:
            item.delete()

        return True
