

from .stop_recurrency_for_transaction import stop_recurrency_for_transaction
from .create_recurrency_for_transaction import create_recurrency_for_transaction
from .pay_transaction import pay_transaction
from category.models import Category
from tag.models import Tag


def update_single_transaction(transaction, data):
    transaction.currency.currency = data['currency']
    transaction.currency.amount = data['amount']
    transaction.currency.save()

    if data['completed']:
        pay_transaction(transaction)
    else:
        transaction.completed = False

    transaction.payment_item.category = Category.objects.get(
        id=data['category'])

    # clear tags from payment item
    for tag_id in list(
            transaction.payment_item.tags.all().values('id')):
        transaction.payment_item.tags.remove(tag_id['id'])

    updated_tags = data['tags']
    for tag in updated_tags:
        item = Tag.objects.get(
            pk=tag['id'], created_by=transaction.created_by)
        if item:
            transaction.payment_item.tags.add(item)

    transaction.payment_item.save()

    transaction.date_of_transaction = data['date_of_transaction']
    transaction.description = data['description']
    transaction.notes = data['notes']

    is_recurrent = transaction.recurrent is not None
    if data['recurrent'] != is_recurrent:
        if data['recurrent']:
            create_recurrency_for_transaction(
                transaction, transaction.payment_item)
        else:
            stop_recurrency_for_transaction(transaction)

    transaction.save()

    return transaction


def update_pending_transactions(transaction, data):
    from transaction.models import Transaction

    pending = []
    installment = transaction.installment
    recurrent = transaction.recurrent

    if installment:
        pending = Transaction.objects.filter(
            installment=installment,
            completed=False
        )
    elif recurrent:
        pending = Transaction.objects.filter(
            recurrent=recurrent,
            completed=False
        )

    for item in pending:
        item.currency.currency = data['currency']
        item.currency.amount = data['amount']
        item.currency.save()
        item.description = data['description']
        item.notes = data['notes']
        if data['completed']:
            pay_transaction(item)
        else:
            item.completed = False
        item.save()

    transaction.payment_item.category = Category.objects.get(
        id=data['category'])
    transaction.payment_item.description = data['description']
    transaction.payment_item.notes = data['notes']
    for tag_id in list(
            transaction.payment_item.tags.all().values('id')):
        transaction.payment_item.tags.remove(tag_id['id'])
    updated_tags = data['tags']
    for tag in updated_tags:
        item = Tag.objects.get(
            pk=tag['id'], created_by=transaction.created_by)
        if item:
            transaction.payment_item.tags.add(item)
    transaction.payment_item.save()

    transaction.payment_item.currency.currency = data['currency']
    transaction.payment_item.currency.amount = data['amount']
    transaction.payment_item.currency.save()

    return True


def update_all_transactions(transaction, data):
    from transaction.models import Transaction

    all_transactions = []
    installment = transaction.installment
    recurrent = transaction.recurrent

    if installment:
        all_transactions = Transaction.objects.filter(
            installment=installment,
        )
    elif recurrent:
        all_transactions = Transaction.objects.filter(
            recurrent=recurrent,
        )

    for item in all_transactions:
        if not item.completed:
            item.currency.currency = data['currency']
            item.currency.amount = data['amount']
            item.currency.save()
        item.description = data['description']
        item.notes = data['notes']
        item.save()

    transaction.payment_item.category = Category.objects.get(
        id=data['category'])
    transaction.payment_item.description = data['description']
    transaction.payment_item.notes = data['notes']
    for tag_id in list(
            transaction.payment_item.tags.all().values('id')):
        transaction.payment_item.tags.remove(tag_id['id'])
    updated_tags = data['tags']
    for tag in updated_tags:
        item = Tag.objects.get(
            pk=tag['id'], created_by=transaction.created_by)
        if item:
            transaction.payment_item.tags.add(item)
    transaction.payment_item.save()

    transaction.payment_item.currency.currency = data['currency']
    transaction.payment_item.currency.amount = data['amount']
    transaction.payment_item.currency.save()
    return True
