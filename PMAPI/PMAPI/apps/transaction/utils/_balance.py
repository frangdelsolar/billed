from decimal import Decimal
from ._queries import get_transaction_qs_by_date
from .get_exchange_rate import get_exchange_rate

RATE_DATA = get_exchange_rate()


def get_income_total(user, month, year):
    income_ts = get_transaction_qs_by_date(user, month, year).filter(
        type='income')

    total = 0
    for item in income_ts:
        if item.currency.currency == 'USD':
            total += item.currency.amount * Decimal(RATE_DATA['compra'])
        else:
            total += item.currency.amount

    return total


def get_expenses_total(user, month, year):
    expense_ts = get_transaction_qs_by_date(user, month, year).filter(
        type='expense')

    total = 0
    for item in expense_ts:
        if item.currency.currency == 'USD':
            total += item.currency.amount * Decimal(RATE_DATA['venta'])
        else:
            total += item.currency.amount

    return total
