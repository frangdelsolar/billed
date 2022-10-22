from transaction.models import Transaction
from payment_item.models import RecurrentPayment

import datetime
import pytz


def get_transaction_qs_by_date(user, month, year):
    queryset = Transaction.objects.filter(
        created_by=user, date_of_transaction__month=month, date_of_transaction__year=year)
    recurrent_qs = RecurrentPayment.objects.filter(
        created_by=user)

    for pay in recurrent_qs:
        if queryset.filter(payment_item=pay.payment_item).count() <= 0:
            new_date = datetime.datetime(year=int(year), month=int(
                month), day=pay.payment_item.date_created.day, tzinfo=pytz.UTC)
            if new_date > pay.payment_item.date_created:
                Transaction.create(
                    payment_item=pay.payment_item,
                    amount=pay.payment_item.currency.amount,
                    currency=pay.payment_item.currency.currency,
                    exchange_rate=pay.payment_item.currency.exchange_rate,
                    category=pay.payment_item.category.id,
                    type=pay.payment_type,
                    date_of_transaction=new_date,
                    description=pay.payment_item.description,
                    notes=pay.payment_item.notes,
                    completed=False,
                    create_recurrent=False,
                    convert=False,
                    repeats=False,
                    repetitions=None,
                    frequency=None,
                    installment=None,
                    recurrent=pay
                )

    return queryset.filter(created_by=user,
                           date_of_transaction__month=month, date_of_transaction__year=year)
