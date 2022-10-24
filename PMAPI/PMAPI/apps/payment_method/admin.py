from django.contrib import admin
from payment_method.models import CreditCard, Account

admin.site.register(Account)
admin.site.register(CreditCard)
