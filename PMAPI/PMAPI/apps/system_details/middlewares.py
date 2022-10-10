from threading import local
from django.conf import settings
from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.authentication import JWTAuthentication

_user = local()


class CustomAuthentication(JWTAuthentication):
    def retrieve_user(self, request):
        header = self.get_header(request)

        if header is None:
            raw_token = request.COOKIES.get(
                settings.SIMPLE_JWT['AUTH_COOKIE']) or None
        else:
            raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token


class CurrentUserMiddleware(MiddlewareMixin):
    def process_request(self, request):
        _user.value = request.user

        if 'Authorization' in request.headers:
            auth = CustomAuthentication()
            _user.value = auth.retrieve_user(request)[0]

    def get_current_user():
        try:
            return _user.value
        except AttributeError:
            return None
