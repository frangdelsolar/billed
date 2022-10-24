from timeit import repeat
from django.db.models import Sum
from transaction.utils.pay_transaction import pay_transaction

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from payment_item.models import RecurrentPayment
from transaction.models import Transaction
from .serializers import TransactionSerializer
from transaction.utils._queries import get_transaction_qs_by_date
from transaction.utils._balance import get_income_total, get_expenses_total
from transaction.utils.destroy_transaction import (
    destroy_all_transactions,
    destroy_pending_transactions,
    destroy_single_transaction)
from transaction.utils.update_transaction import (
    update_single_transaction,
    update_pending_transactions,
    update_all_transactions
)
from transaction.utils.handle_upload_csv import handle_uploaded_file
import datetime


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
        category = request.data.get('category')
        tags = request.data.get('tags')

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
            create_recurrent=create_recurrent,
            convert=True,
            repeats=repeats,
            repetitions=repetitions,
            frequency=frequency,
            installment=None,
            recurrent=None,
            tags=tags
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

    def update(self, request, pk=None, *args, **kwargs):
        bulk_mode = request.data.get('bulk_mode')
        instance = Transaction.objects.get(pk=pk)

        if instance.created_by != request.user:
            return Response({'message': "Forbidden"}, 403)

        if bulk_mode == 'single':
            update_single_transaction(instance, request.data)

        elif bulk_mode == 'pending':
            update_pending_transactions(instance, request.data)

        elif bulk_mode == 'all':
            update_all_transactions(instance, request.data)

        return Response(self.serializer_class(instance).data)

    def destroy(self, request,  pk=None, *args, **kwargs):
        bulk_mode = request.GET.get('bulk_mode')
        instance = Transaction.objects.get(pk=pk)

        if instance.created_by != request.user:
            return Response({'message': "Forbidden"}, 403)

        deleted = None
        if bulk_mode == 'single':
            deleted = destroy_single_transaction(instance)

        elif bulk_mode == 'pending':
            deleted = destroy_pending_transactions(instance)

        elif bulk_mode == 'all':
            deleted = destroy_all_transactions(instance)

        if deleted:
            return Response({'message': "Success", "data": deleted}, 200)

        return Response({'message': "Unknown Error - Nothing was deleted"}, 500)


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

        income = get_income_total(request.user, month, year)
        expenses = get_expenses_total(request.user, month, year)

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
        if transaction.created_by != request.user:
            return Response({'message': 'No tienes permiso para editar esta transacción'}, status=403)

        pay_transaction(transaction)

        return Response(self.serializer_class(transaction).data)


class CSVHandlerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # if transaction.created_by != request.user:
        #     return Response({'message': 'No tienes permiso para editar esta transacción'}, status=403)
        handle_uploaded_file(request.user, request.FILES['file'])
        return Response(200)
