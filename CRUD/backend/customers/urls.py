from django.urls import path
from .views import (
    TestAPIView,
    CustomerListAPIView,
    CustomerDetailAPIView,
)

urlpatterns = [
    path("test/", TestAPIView.as_view()),
    path("", CustomerListAPIView.as_view()),
    path("<int:pk>/", CustomerDetailAPIView.as_view()),
]