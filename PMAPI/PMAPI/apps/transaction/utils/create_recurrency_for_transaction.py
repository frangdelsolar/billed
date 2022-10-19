from payment_item.models import RecurrentPayment


def create_recurrency_for_transaction(transaction):
    recurrent_payment = RecurrentPayment.objects.create(
        payment_item=transaction.payment_item,
        payment_type=transaction.type
    )
    transaction.recurrent = recurrent_payment
    transaction.save()
