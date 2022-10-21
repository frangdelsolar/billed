from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response

from user.models import Profile
from .serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = UserSerializer
    permission_classes = []

    def get_queryset(self, *args, **kwargs):
        qs = Profile.objects.filter(user=self.request.user)
        return qs

    def create(self, request):
        data = request.data
        username = data.get('username')
        email = data.get('email')
        email_confirmation = data.pop('email_confirmation')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        password = data.get('password')
        password_confirmation = data.pop('password_confirmation')

        if email and password and (email == email_confirmation) and (password == password_confirmation):
            if username and first_name and last_name:

                profile = Profile.create(data)

        return Response(profile.user.__str__())


class UsernameValidView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        username = request.data['username']

        valid = False
        if username:

            valid = User.objects.filter(username=username).count() == 0

        return Response({'valid_username': valid}, 200)
