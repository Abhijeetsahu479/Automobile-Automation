from django.test import TestCase

# Create your tests here.
from datetime import date

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Customer


class CustomerAPITestCase(APITestCase):

    def setUp(self):
        self.customer = Customer.objects.create(
            name="Test Customer",
            phone="9876543210",
            email="test@example.com",
            company_name="Test Auto Service",
            last_service_date=date(2026, 9, 1),
            service_type="Car Service",
            vehicle_number="MP04TEST01",
        )

    def test_get_customers(self):
        response = self.client.get("/api/customers/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Test Customer")

    def test_patch_customer(self):
        response = self.client.patch(
            f"/api/customers/{self.customer.id}/",
            {
                "name": "Updated Customer",
                "phone": "9999999999",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.customer.refresh_from_db()

        self.assertEqual(self.customer.name, "Updated Customer")
        self.assertEqual(self.customer.phone, "9999999999")

    def test_last_service_date_can_be_updated(self):
        response = self.client.patch(
            f"/api/customers/{self.customer.id}/",
            {
                "last_service_date": "2026-12-30",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.customer.refresh_from_db()

        self.assertEqual(
            self.customer.last_service_date,
            date(2026, 12, 30)
        )

    def test_patch_non_existing_customer(self):
        response = self.client.patch(
            "/api/customers/99999/",
            {
                "name": "Unknown Customer",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)