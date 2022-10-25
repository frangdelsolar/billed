from transaction.models import Transaction
from django.db.models import Sum


def get_historical_data(user, date_from_str, date_to_str):
    qs = Transaction.objects.filter(created_by=user, date_of_transaction__range=[
                                    date_from_str, date_to_str]).order_by('date_of_transaction')

    labels = []
    months = []
    income = []
    expense = []
    total = []
    for i in qs:
        label = f'{str(i.date_of_transaction.month)}/{str(i.date_of_transaction.year)[2:]}'
        if not label in labels:
            labels.append(label)
            months.append([i.date_of_transaction.month,
                          i.date_of_transaction.year])

    for m, y in months:
        income_qs = qs.filter(date_of_transaction__month=m,
                              date_of_transaction__year=y, type='income').aggregate(Sum('currency__amount'))['currency__amount__sum']
        expense_qs = qs.filter(date_of_transaction__month=m,
                               date_of_transaction__year=y, type='expense').aggregate(Sum('currency__amount'))['currency__amount__sum']
        if not income_qs:
            income_qs = 0

        if not expense_qs:
            expense_qs = 0
        income.append(float(income_qs))
        expense.append(float(expense_qs))
        total.append(float(income_qs)-float(expense_qs))

    return {
        'labels': labels,
        'income': income,
        'expense': expense,
        'total': total
    }
