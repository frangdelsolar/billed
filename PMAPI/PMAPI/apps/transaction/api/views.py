from decimal import Decimal
from timeit import repeat
from django.db.models import Sum

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from payment_item.models import RecurrentPayment
from transaction.models import Transaction
from .serializers import TransactionSerializer

import datetime
import pytz
import requests


def get_transaction_qs_by_date(user, month, year):
    queryset = Transaction.objects.filter(
        created_by=user, date_of_transaction__month=month, date_of_transaction__year=year)
    recurrent_qs = RecurrentPayment.objects.filter(
        created_by=user)

    for pay in recurrent_qs:
        if queryset.filter(payment_item=pay.payment_item).count() <= 0:
            new_date = datetime.datetime(year=int(year), month=int(
                month), day=pay.payment_item.date_created.day, tzinfo=pytz.UTC)
            if new_date > pay.payment_item.date_created:
                Transaction.create(
                    payment_item=pay.payment_item,
                    amount=pay.payment_item.currency.amount,
                    currency=pay.payment_item.currency.currency,
                    exchange_rate=pay.payment_item.currency.exchange_rate,
                    category=pay.payment_item.category.id,
                    type=pay.payment_type,
                    date_of_transaction=new_date,
                    description=pay.payment_item.description,
                    notes=pay.payment_item.notes,
                    completed=False,
                    ignore=False,
                    create_recurrent=False,
                    convert=False,
                    repeats=False,
                    repetitions=None,
                    frequency=None,
                    installment=None,
                    recurrent=pay
                )

    return queryset.filter(created_by=user,
                           date_of_transaction__month=month, date_of_transaction__year=year)


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = super(TransactionViewSet, self).get_queryset()
        qs = qs.filter(created_by=self.request.user)
        return qs

    def create(self, request):
        transaction_type = request.data.get('type')
        currency = request.data.get('currency')
        amount = request.data.get('amount')
        exchange_rate = request.data.get('exchange_rate')
        completed = request.data.get('completed')
        date_of_transaction = datetime.datetime.fromisoformat(
            request.data.get('date_of_transaction').replace("Z", ""))
        description = request.data.get('description')
        create_recurrent = request.data.get('recurrent')
        repeats = request.data.get('repeats')
        repetitions = request.data.get('repetitions')
        frequency = request.data.get('frequency')
        notes = request.data.get('notes')
        ignore = request.data.get('ignore')
        category = request.data.get('category')

        if exchange_rate == "":
            exchange_rate = 1

        errors = []
        if not currency:
            errors.append({'currency': "required"})

        if not amount:
            errors.append({'amount': "required"})

        if not date_of_transaction:
            errors.append({'date_of_transaction': "required"})

        if not description:
            errors.append({'description': "required"})

        if repeats:
            if not repetitions:
                errors.append({'repetitions': "required"})

            if not frequency:
                errors.append({'frequency': "required"})

        if len(errors) > 0:
            error_data = {
                'message': 'No se pudo crear transacción',
                'errors': errors
            }
            return Response({'status': '400', 'data': error_data})

        instance = Transaction.create(
            payment_item=None,
            amount=amount,
            currency=currency,
            exchange_rate=exchange_rate,
            category=category,
            type=transaction_type,
            date_of_transaction=date_of_transaction,
            description=description,
            notes=notes,
            completed=completed,
            ignore=ignore,
            create_recurrent=create_recurrent,
            convert=True,
            repeats=repeats,
            repetitions=repetitions,
            frequency=frequency,
            installment=None,
            recurrent=None
        )

        return Response(self.serializer_class(instance).data)

    def list(self, request):
        month = request.GET.get('month')
        year = request.GET.get('year')
        transaction_type = request.GET.get('transaction_type')

        queryset = Transaction.objects.filter(created_by=request.user)

        if month and year:
            queryset = get_transaction_qs_by_date(request.user, month, year)

        if transaction_type:
            queryset = queryset.filter(type=transaction_type)

        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def update(self, request, pk=None):
        instance = Transaction.objects.get(pk=pk)
        instance.update(**request.data)
        print(request.data)

        return Response(self.serializer_class(instance).data)

    def destroy(self, request, pk=None):
        instance = Transaction.objects.get(pk=pk)
        if (instance.created_by == request.user):
            success = instance.destroy()
            if success:
                return Response({'message': "Success"}, 200)
            return Response({'message': "Unknown Error"}, 500)
        return Response({'message': "Forbidden"}, 403)


class BalanceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        month = request.GET.get('month')
        year = request.GET.get('year')

        today = datetime.date.today()
        if not month:
            month = today.month
        if not year:
            year = today.year

        income = get_transaction_qs_by_date(request.user, month, year).filter(
            type='income').aggregate(total=Sum('currency__amount'))['total']
        expenses = get_transaction_qs_by_date(request.user, month, year).filter(
            type='expense').aggregate(total=Sum('currency__amount'))['total']
        total = 0
        if not income:
            income = 0
        if not expenses:
            expenses = 0
        total = income - expenses

        data = {
            'income': income,
            'expense': expenses,
            'total': total
        }
        return Response(data, 200)


class PayView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer

    def post(self, request, pk):
        transaction = Transaction.objects.get(pk=pk)
        if transaction.created_by == request.user:
            if transaction.currency.currency == "USD":
                api_url = "https://api-dolar-argentina.herokuapp.com/api/dolarblue"
                response = requests.get(api_url)
                data = response.json()
                transaction.currency.currency = "ARS"
                transaction.currency.amount *= Decimal(data['compra'])
                transaction.currency.exchange_rate = Decimal(data['compra'])
                transaction.currency.save()
            transaction.completed = True
            transaction.save()

            return Response(self.serializer_class(transaction).data)
        return Response({'message': 'No tienes permiso para editar esta transacción'}, status=403)
