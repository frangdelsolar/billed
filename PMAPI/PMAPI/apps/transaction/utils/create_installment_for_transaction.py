from payment_item.models import Installment


def create_installment_for_transaction(transaction, repetitions, frequency):
    installment = Installment.create(
        payment_item=transaction.payment_item,
        payment_type=transaction.type,
        repetitions=repetitions,
        frequency=frequency,
        transaction=transaction
    )
    transaction.installment = installment
    transaction.save()
