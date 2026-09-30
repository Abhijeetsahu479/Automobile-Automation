from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from customers.models import Customer, Campaign


class CampaignAPITestCase(APITestCase):

    def setUp(self):
        self.customer = Customer.objects.create(
            name="Campaign Test Customer",
            phone="9876543210",
            email="campaign@test.com",
            company_name="Test Auto Service",
            service_type="Car Service",
            vehicle_number="MP04TEST01",
        )

    def test_start_campaign(self):
        response = self.client.post(
            "/api/campaigns/start/",
            {
                "customer": self.customer.id,
                "campaign_type": "re-engagement",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED
        )

        self.assertEqual(
            response.data["customer"],
            self.customer.id
        )

        self.assertEqual(
            response.data["campaign_type"],
            "re-engagement"
        )

        self.assertEqual(
            response.data["status"],
            "pending"
        )

    def test_get_campaign_details(self):
        campaign = Campaign.objects.create(
            customer=self.customer,
            campaign_type="re-engagement",
        )

        response = self.client.get(
            f"/api/campaigns/{campaign.id}/"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

        self.assertEqual(
            response.data["id"],
            campaign.id
        )

        self.assertEqual(
            response.data["customer"],
            self.customer.id
        )

    def test_campaign_not_found(self):
        response = self.client.get(
            "/api/campaigns/99999/"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND
        )

        self.assertEqual(
            response.data["error"],
            "Campaign not found"
        )

    def test_start_campaign_invalid_data(self):
        response = self.client.post(
            "/api/campaigns/start/",
            {},
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST
        )