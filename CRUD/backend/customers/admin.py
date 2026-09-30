from django.contrib import admin
from .models import Customer, ServiceRecord


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "phone",
        "email",
        "company_name",
        "last_service_date",
        "service_type",
    )
    search_fields = ("name", "phone", "email", "company_name")
    list_filter = ("service_type",)


@admin.register(ServiceRecord)
class ServiceRecordAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "customer",
        "service_date",
        "service_type",
        "vehicle_number",
    )
    search_fields = (
        "customer__name",
        "customer__phone",
        "vehicle_number",
    )
    list_filter = ("service_type", "service_date")