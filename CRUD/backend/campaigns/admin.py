from django.contrib import admin
from customers.models import Campaign, CampaignStatus, BroadcastOffer

@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "customer",
        "campaign_type",
        "status",
        "started_at",
        "completed_at",
    )
    search_fields = (
        "customer__name",
        "customer__phone",
        "campaign_type",
    )
    list_filter = ("campaign_type", "status")


@admin.register(CampaignStatus)
class CampaignStatusAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "campaign",
        "status",
        "created_at",
    )
    search_fields = (
        "campaign__customer__name",
        "status",
    )
    list_filter = ("status",)


@admin.register(BroadcastOffer)
class BroadcastOfferAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "campaign",
        "title",
        "is_active",
        "created_at",
    )
    search_fields = (
        "title",
        "campaign__customer__name",
    )
    list_filter = ("is_active",)