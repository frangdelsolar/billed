from django.db import models
from payment_item.models import RecurrentPayment
from payment_item.models import PaymentItem
from system_details.models import Metadata
from currency_field.models import CurrencyField
from category.models import Category
import datetime
from dateutil.relativedelta import relativedelta

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
    completed = models.BooleanField(default=False)
    ignore = models.BooleanField(default=False)
    notes = models.CharField(max_length=500, null=True, blank=True)
    parent_transaction = models.ForeignKey(
        'transaction.Transaction', on_delete=models.SET_NULL, blank=True, null=True, related_name="children"
    )

    @classmethod
    def create(self, *args, **kwargs):
        convert = kwargs.pop('convert')
        amount = kwargs.pop('amount')
        currency = kwargs.pop('currency')
        exchange_rate = kwargs.pop('exchange_rate')
        payment_item = kwargs.get('payment_item')
        recurrent = kwargs.pop('recurrent')
        repeats = kwargs.pop('repeats')
        repetitions = kwargs.pop('repetitions')
        frequency = kwargs.pop('frequency')
        category = kwargs.pop('category')

        if convert == True:
            amount = Decimal.from_float(float(amount)*float(exchange_rate))
            currency = 'ARS'

        cf = CurrencyField.objects.create(
            amount=amount,
            currency=currency,
            exchange_rate=exchange_rate
        )
        kwargs['currency'] = cf

        if not 'payment_item' in kwargs:
            payment_item = PaymentItem.create(
                description=kwargs['description'],
                amount=amount,
                currency=currency,
                exchange_rate=exchange_rate,
                category=Category.objects.get(id=category)
            )
            kwargs['payment_item'] = payment_item

        instance = self.objects.create(**kwargs)

        if recurrent:
            recurrent_payment = RecurrentPayment.objects.create(
                payment_item=payment_item,
                payment_type=instance.type
            )

        if repeats:
            instance.create_repetitions(repetitions, frequency)

        return instance

    def create_repetitions(self, repetitions, frequency):
        for i in range(1, int(repetitions)):

            new_date = self.date_of_transaction
            if frequency == 'days':
                new_date += datetime.timedelta(days=i)
            elif frequency == 'months':
                new_date += relativedelta(months=i)
            elif frequency == 'weeks':
                new_date += relativedelta(weeks=i)
            elif frequency == 'years':
                new_date += relativedelta(years=i)

            if new_date:
                Transaction.create(
                    convert=False,
                    amount=self.currency.amount,
                    currency=self.currency.currency,
                    exchange_rate=self.currency.exchange_rate,
                    payment_item=self.payment_item,
                    category=self.payment_item.category,
                    type=self.type,
                    date_of_transaction=new_date,
                    description=self.description,
                    completed=False,
                    ignore=False,
                    notes=self.notes,
                    parent_transaction=self,
                    recurrent=False,
                    repeats=False,
                    repetitions=None,
                    frequency=None
                )
