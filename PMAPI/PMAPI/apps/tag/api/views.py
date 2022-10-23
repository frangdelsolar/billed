from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from tag.models import Tag
from .serializers import TagSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = super(TagViewSet, self).get_queryset()
        qs = qs.filter(created_by=self.request.user)
        return qs

    def list(self, request):
        qs = self.queryset
        search = request.GET.get('search')

        if search:
            qs = self.queryset.filter(name__icontains=search)

        data = []
        for item in qs:
            data.append(item.name)
        return Response(data)
