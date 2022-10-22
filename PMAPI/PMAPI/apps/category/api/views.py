from unicodedata import name
from payment_item.utils.change_category import move_items_from_category
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


from category.models import Category
from .serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        category_type = self.request.GET.get('search')
        archived = self.request.GET.get('archived')
        qs = Category.objects.filter(
            category_type=category_type,
            created_by=self.request.user
        ).order_by('name')

        if archived:
            qs = qs.filter(archived=True)
        else:
            qs = qs.filter(archived=False)
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

        name = request.data.get('name')
        color = request.data.get('color')
        icon = request.data.get('icon')
        archived = request.data.get('archived')

        if name and color and icon:
            instance.name = name
            instance.color = color
            instance.icon = icon

        if 'archived' in request.data:
            instance.archived = archived

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


class MoveCategoryView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CategorySerializer

    def put(self, request, pk):
        instance = Category.objects.get(pk=pk)

        if instance.created_by != request.user:
            return Response({'message': "Forbidden"}, 403)

        move_items_from_category(
            request.user, request.data['from'], request.data['to'])

        return Response(request.data)
