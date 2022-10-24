from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from system_details.models import Metadata
from payment_method.models import Account, CreditCard
from .serializers import AccountSerializer, CreditCardSerializer


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = super(AccountViewSet, self).get_queryset()
        qs = qs.filter(created_by=self.request.user)
        return qs


class CreditCardViewSet(viewsets.ModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = super(CreditCardViewSet, self).get_queryset()
        qs = qs.filter(created_by=self.request.user)
        return qs
