import csv
import datetime
from tag.models import Tag
from .get_exchange_rate import get_exchange_rate
from category.models import Category
from user.models import FileUpload
from transaction.models import Transaction
from .str_to_date import get_date_from_str


def validate_and_clean_date(_date):
    date = None
    try:
        date = get_date_from_str(_date)
    except Exception as e:
        # print(e)
        pass
    return date


def validate_and_clean_amount(_amount):
    amount = None
    exchange_rate = None
    try:
        amount = float(_amount)
        exchange_rate = get_exchange_rate()['venta']

    except ValueError as e:
        # print(e)
        pass
    return amount, exchange_rate


def validate_and_clean_type(_type_of_transaction):
    clean_data = None
    if _type_of_transaction == 'Ingreso':
        clean_data = 'income'
    elif _type_of_transaction == 'Gasto':
        clean_data = 'expense'
    return clean_data


def clean_category(_category, transaction_type, user):
    clean_data = None
    if _category:
        clean_data = Category.objects.get_or_create(
            name=_category, category_type=transaction_type, created_by=user)[0].id
    else:
        clean_data = Category.objects.get_or_create(
            name='Otros', category_type=transaction_type, created_by=user)[0].id

    return clean_data


def clean_tags(_tags, user):
    _tags = _tags.rsplit(';')
    clean_data = []
    for tag in _tags:
        if len(tag) > 0:
            instance = Tag.objects.get_or_create(name=tag, created_by=user)[0]
            clean_data.append({
                'id': instance.id,
                'name': instance.name
            })
    return clean_data


def clean_completed(_completed):
    if _completed == 'Falso':
        return False
    return True


def handle_uploaded_file(user, uploaded_file):

    stored_file = FileUpload.objects.create(
        file=uploaded_file, created_by=user)

    with open(stored_file.file.path, newline='') as csvfile:
        filereader = csv.reader(csvfile, delimiter=',', quotechar='|')

        for i, row in enumerate(filereader):
            if i > 11:
                _date = row[0]
                _description = row[1]
                _currency = row[2]
                _amount = row[3]
                _type_of_transaction = row[4]
                _completed = row[5]
                _category = row[6]
                _tags = row[7]
                _notes = row[8]

                clean_date = validate_and_clean_date(_date)
                description_valid, description = _description is not None, _description
                currency_valid, currency = _currency in [
                    'ARS', 'USD'], _currency
                convert = True if currency == 'USD' else False
                clean_amount, exchange_rate = validate_and_clean_amount(
                    _amount)
                clean_transaction_type = validate_and_clean_type(
                    _type_of_transaction)
                if not clean_transaction_type:
                    continue

                clean_completed_value = clean_completed(_completed)

                clean_category_id = clean_category(
                    _category, clean_transaction_type, user)
                tags = clean_tags(_tags, user)
                notes = _notes

                if (clean_date and description_valid and currency_valid and exchange_rate and clean_amount and clean_transaction_type and clean_category_id):
                    instance = Transaction.create(
                        payment_item=None,
                        amount=clean_amount,
                        currency=currency,
                        exchange_rate=exchange_rate,
                        category=clean_category_id,
                        type=clean_transaction_type,
                        date_of_transaction=clean_date,
                        description=description,
                        notes=notes,
                        completed=clean_completed_value,
                        create_recurrent=False,
                        convert=convert,
                        repeats=False,
                        repetitions=1,
                        frequency=None,
                        installment=None,
                        recurrent=None,
                        tags=tags
                    )
