from decimal import Decimal
from .get_exchange_rate import get_exchange_rate


def pay_transaction(transaction):
    if transaction.currency.currency == "USD":
        data = get_exchange_rate()
        transaction.currency.currency = "ARS"
        transaction.currency.amount *= Decimal(data['compra'])
        transaction.currency.exchange_rate = Decimal(data['compra'])
        transaction.currency.save()
    transaction.completed = True
    transaction.save()
