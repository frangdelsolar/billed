

from .stop_recurrency_for_transaction import stop_recurrency_for_transaction
from .create_recurrency_for_transaction import create_recurrency_for_transaction
from .pay_transaction import pay_transaction
from category.models import Category


def update_single_transaction(transaction, data):
    print(data)
    updated = transaction.__str__()

    transaction.currency.currency = data['currency']
    transaction.currency.amount = data['amount']
    transaction.currency.save()

    if data['completed']:
        pay_transaction(transaction)
    else:
        transaction.completed = False

    transaction.payment_item.category = Category.objects.get(
        id=data['category'])
    transaction.payment_item.save()

    transaction.date_of_transaction = data['date_of_transaction']
    transaction.description = data['description']
    transaction.notes = data['notes']
    transaction.ignore = data['ignore']

    is_recurrent = transaction.recurrent is not None
    if data['recurrent'] != is_recurrent:
        if data['recurrent']:
            create_recurrency_for_transaction(transaction)
        else:
            stop_recurrency_for_transaction(transaction)

    transaction.save()

    return updated


def update_pending_transactions(transaction):
    # from transaction.models import Transaction

    # response = []
    # pending = None
    # installment = transaction.installment
    # recurrent = transaction.recurrent

    # if installment:
    #     pending = Transaction.objects.filter(
    #         installment=installment,
    #         completed=False
    #     )
    # elif recurrent:
    #     pending = Transaction.objects.filter(
    #         recurrent=recurrent,
    #         completed=False
    #     )

    # for item in pending:
    #     deleted = destroy_single_transaction(item)
    #     response.append(deleted)

    # if recurrent:
    #     deleted = recurrent.__str__()
    #     recurrent.delete()
    #     response.append(deleted)

    # return response
    pass


def update_all_transactions(transaction):
    # from transaction.models import Transaction

    # response = []

    # all = None
    # installment = transaction.installment
    # recurrent = transaction.recurrent

    # if installment:
    #     all = Transaction.objects.filter(
    #         installment=installment,
    #     )
    # elif recurrent:
    #     all = Transaction.objects.filter(
    #         recurrent=recurrent,
    #     )

    # for item in all:
    #     deleted = destroy_single_transaction(item)
    #     response.append(deleted)

    # if recurrent:
    #     deleted = recurrent.__str__()
    #     recurrent.delete()
    #     response.append(deleted)

    # if installment:
    #     deleted = installment.__str__()
    #     installment.delete()
    #     response.append(deleted)

    # return response
    pass
