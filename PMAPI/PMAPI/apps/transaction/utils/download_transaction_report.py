from .str_to_date import get_date_from_str
from transaction.models import Transaction
import csv
import os
import datetime
from user.models import TransactionReport


def generate_report(date_from, date_to, user):
    _date_from = get_date_from_str(date_from)
    _date_to = get_date_from_str(date_to)

    qs = Transaction.objects.filter(
        created_by=user, date_of_transaction__range=[_date_from, _date_to])

    header = ['Fecha', 'Descripción', 'Moneda', 'Total',
              'Tipo de transacción', 'Completado', 'Categoría', 'Etiquetas', 'Notas']
    data = []
    for item in qs:
        row = [
            str(item.date_of_transaction),
            item.description,
            item.currency.currency,
            str(item.currency.amount),
            item.type,
            item.completed,
            item.payment_item.category.name,
            [i['name'] for i in item.payment_item.tags.all().values('name')],
            item.notes
        ]
        data.append(row)

    filename = f'reports/{user.username}/Report-{datetime.datetime.now()}.csv'
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, 'w', newline="") as file:
        csvwriter = csv.writer(file)
        csvwriter.writerow(header)
        csvwriter.writerows(data)

    treport = TransactionReport.objects.create(
        file=filename,
        description='Report'
    )

    return treport
