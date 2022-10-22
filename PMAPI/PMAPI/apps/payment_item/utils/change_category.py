from unicodedata import category
from category.models import Category
from payment_item.models import PaymentItem


def move_items_from_category(user, category_from, category_to):
    fr = Category.objects.get(created_by=user, pk=category_from)
    to = Category.objects.get(created_by=user, pk=category_to)
    items = PaymentItem.objects.filter(created_by=user, category=fr)

    for item in items:
        item.category = to
        item.save()
