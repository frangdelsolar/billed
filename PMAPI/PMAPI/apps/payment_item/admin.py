from django.contrib import admin
from payment_item.models import PaymentItem, RecurrentPayment

admin.site.register(PaymentItem)
admin.site.register(RecurrentPayment)
