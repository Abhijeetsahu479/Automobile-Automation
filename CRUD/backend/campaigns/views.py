from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from customers.models import Campaign
from .serializers import CampaignSerializer


class StartCampaignAPIView(APIView):
    def post(self, request):
        serializer = CampaignSerializer(data=request.data)

        if serializer.is_valid():
            campaign = serializer.save()

            return Response(
                CampaignSerializer(campaign).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class CampaignDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            campaign = Campaign.objects.get(pk=pk)
        except Campaign.DoesNotExist:
            return Response(
                {"error": "Campaign not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = CampaignSerializer(campaign)

        return Response(serializer.data)
class CampaignDecisionAPIView(APIView):
    def post(self, request):
        campaign_id = request.data.get("campaign_id")
        conversation_context = request.data.get(
            "conversation_context",
            ""
        )

        if not campaign_id:
            return Response(
                {"error": "campaign_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not conversation_context:
            return Response(
                {"error": "conversation_context is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            campaign = Campaign.objects.get(pk=campaign_id)
        except Campaign.DoesNotExist:
            return Response(
                {"error": "Campaign not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # AI decision logic will be handled by the AI Engine.
        # This is the CRUD-side API contract for n8n.
        return Response({
            "campaign_id": campaign.id,
            "next_action": "continue",
            "reply_text": "",
            "conversation_context": conversation_context,
        })
class CampaignListAPIView(APIView):
    def get(self, request):
        campaigns = Campaign.objects.all().order_by("-created_at")
        serializer = CampaignSerializer(campaigns, many=True)
        return Response(serializer.data)