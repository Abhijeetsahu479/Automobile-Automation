from django.http import HttpResponseForbidden
from django.conf import settings


class IPRestrictionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        client_ip = request.META.get("REMOTE_ADDR")

        if client_ip not in settings.ALLOWED_IPS:
            return HttpResponseForbidden("Access denied: IP not allowed.")

        return self.get_response(request)