from django.contrib import admin
from payment_item.models import PaymentItem, RecurrentPayment, Installment

admin.site.register(PaymentItem)
admin.site.register(RecurrentPayment)
admin.site.register(Installment)
