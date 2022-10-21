from unicodedata import name
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from category.models import Category
from .serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        category_type = self.request.GET.get('search')
        qs = Category.objects.filter(
            category_type=category_type, created_by=self.request.user).order_by('name')
        return qs

    def post(self, request):
        instance = Category.objects.create(
            name=request.data['name'],
            color=request.data['color'],
            icon=request.data['icon'],
            category_type=request.data['category_type'],
        )

        return Response(self.serializer_class(instance).data)

    def update(self, request, pk=None, *args, **kwargs):
        instance = Category.objects.get(pk=pk)

        if instance.created_by != request.user:
            return Response({'message': "Forbidden"}, 403)

        instance.name = request.data['name']
        instance.color = request.data['color']
        instance.icon = request.data['icon']
        instance.save()

        return Response(self.serializer_class(instance).data)

    def destroy(self, request,  pk=None, *args, **kwargs):
        instance = Category.objects.get(pk=pk)

        if instance.created_by != request.user:
            return Response({'message': "Forbidden"}, 403)

        deleted = False
        if instance.payment_items.all().count() == 0:
            instance.delete()
            deleted = True

        if deleted:
            return Response({'message': "Success", "data": deleted}, 200)

        return Response({'message': "No puedes eliminar este item."}, 500)
