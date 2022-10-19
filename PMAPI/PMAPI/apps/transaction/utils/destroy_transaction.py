

def destroy_single_transaction(transaction):
    deleted = transaction.__str__()
    transaction.delete()
    return deleted


def destroy_pending_transactions(transaction):
    from transaction.models import Transaction

    response = []
    pending = None
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
        deleted = destroy_single_transaction(item)
        response.append(deleted)

    if recurrent:
        deleted = recurrent.__str__()
        recurrent.delete()
        response.append(deleted)

    return response


def destroy_all_transactions(transaction):
    from transaction.models import Transaction

    response = []

    all = None
    installment = transaction.installment
    recurrent = transaction.recurrent

    if installment:
        all = Transaction.objects.filter(
            installment=installment,
        )
    elif recurrent:
        all = Transaction.objects.filter(
            recurrent=recurrent,
        )

    for item in all:
        deleted = destroy_single_transaction(item)
        response.append(deleted)

    if recurrent:
        deleted = recurrent.__str__()
        recurrent.delete()
        response.append(deleted)

    if installment:
        deleted = installment.__str__()
        installment.delete()
        response.append(deleted)

    return response
