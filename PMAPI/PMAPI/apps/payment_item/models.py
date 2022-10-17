from django.db import models
from currency_field.models import CurrencyField
from system_details.models import Metadata
import datetime
from dateutil.relativedelta import relativedelta

CURRENCIES = [
    ('ars', 'Peso Argentino'),
    ('usd', 'Dólar Estadounidense')
]

TRANSACTION_TYPES = [
    ('income', 'Ingreso'),
    ('expense', 'Gasto')
]

FREQUENCY = [
    ('days', 'Días'),
    ('weeks', 'Semanas'),
    ('months', 'Meses'),
    ('years', 'Años')
]


class PaymentItem(Metadata):
    description = models.CharField(max_length=500, null=False, blank=False)
    currency = models.OneToOneField(
        'currency_field.CurrencyField', on_delete=models.CASCADE, blank=False, null=False)
    category = models.ForeignKey(
        'category.Category', on_delete=models.CASCADE, null=True, blank=True)
    notes = models.CharField(max_length=500, null=True, blank=True)

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

    def get_pending_transactions(self):
        from transaction.models import Transaction

        return Transaction.objects.filter(recurrent=self, completed=False)

    def get_all_transactions(self):
        from transaction.models import Transaction

        return Transaction.objects.filter(recurrent=self)


class Installment(Metadata):
    frequency = models.CharField(choices=FREQUENCY, max_length=120)
    repetitions = models.IntegerField()
    payment_item = models.ForeignKey(
        'payment_item.PaymentItem', on_delete=models.CASCADE, related_name="repetitions")
    payment_type = models.CharField(choices=TRANSACTION_TYPES, max_length=120)

    @classmethod
    def create(self, *args, **kwargs):
        from transaction.models import Transaction
        transaction = kwargs.pop('transaction')

        instance = self.objects.create(**kwargs)
        for i in range(1, int(instance.repetitions)):

            new_date = transaction.date_of_transaction
            if instance.frequency == 'days':
                new_date += datetime.timedelta(days=i)
            elif instance.frequency == 'months':
                new_date += relativedelta(months=i)
            elif instance.frequency == 'weeks':
                new_date += relativedelta(weeks=i)
            elif instance.frequency == 'years':
                new_date += relativedelta(years=i)

            if new_date:
                Transaction.create(
                    payment_item=transaction.payment_item,
                    amount=transaction.payment_item.currency.amount,
                    currency=transaction.payment_item.currency.currency,
                    exchange_rate=transaction.payment_item.currency.exchange_rate,
                    category=transaction.payment_item.category,
                    type=transaction.type,
                    date_of_transaction=new_date,
                    description=transaction.description,
                    notes=transaction.notes,
                    completed=False,
                    ignore=False,
                    create_recurrent=False,
                    convert=False,
                    repeats=False,
                    repetitions=None,
                    frequency=None,
                    installment=instance,
                    recurrent=None
                )

    def get_pending_transactions(self):
        from transaction.models import Transaction

        return Transaction.objects.filter(installment=self, completed=False)

    def get_all_transactions(self):
        from transaction.models import Transaction

        return Transaction.objects.filter(installment=self)
