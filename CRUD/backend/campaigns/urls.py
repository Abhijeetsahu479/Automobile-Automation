from django.urls import path

from .views import (
    StartCampaignAPIView,
    CampaignDetailAPIView,
    CampaignDecisionAPIView,
)

urlpatterns = [
    path("start/", StartCampaignAPIView.as_view()),
    path("decision/", CampaignDecisionAPIView.as_view()),
    path("<int:pk>/", CampaignDetailAPIView.as_view()),
]