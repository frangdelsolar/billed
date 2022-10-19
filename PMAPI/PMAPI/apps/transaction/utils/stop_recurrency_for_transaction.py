def stop_recurrency_for_transaction(transaction):
    recurrent = transaction.recurrent
    transaction.recurrent = None
    transaction.save()
    recurrent.delete()
