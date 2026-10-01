from django.urls import path

from .views import (
    CampaignListAPIView,
    StartCampaignAPIView,
    CampaignDetailAPIView,
    CampaignDecisionAPIView,
) 

urlpatterns = [
    path("", CampaignListAPIView.as_view()),
    path("start/", StartCampaignAPIView.as_view()),
    path("decision/", CampaignDecisionAPIView.as_view()),
    path("<int:pk>/", CampaignDetailAPIView.as_view()),
]