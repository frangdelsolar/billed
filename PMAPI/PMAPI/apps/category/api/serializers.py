from rest_framework.serializers import (
    HyperlinkedModelSerializer,
    SerializerMethodField,
    Serializer
)
from category.models import Category


class CategorySerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Category
        fields = [
            'id',
            'name',
            'color',
            'icon',
            'category_type',
            'archived'
        ]
