from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from system_details.models import Metadata
from payment_item.models import PaymentItem
from .serializers import PaymentItemSerializer


class PaymentItemViewSet(viewsets.ModelViewSet):
    queryset = PaymentItem.objects.all()
    serializer_class = PaymentItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = super(PaymentItemViewSet, self).get_queryset()
        qs = qs.filter(created_by=self.request.user)
        return qs
