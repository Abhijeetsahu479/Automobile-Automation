from django.core.management.base import BaseCommand
from customers.models import Customer


class Command(BaseCommand):
    help = "Create demo customer data"

    def handle(self, *args, **kwargs):
        customers = [
            {
                "name": "Rahul Sharma",
                "phone": "9876543210",
                "email": "rahul@example.com",
                "company_name": "Rahul Auto Service",
                "last_service_date": "2026-06-15",
                "service_type": "Car Service",
                "vehicle_number": "MP04AB1234",
            },
            {
                "name": "Amit Verma",
                "phone": "9123456789",
                "email": "amit@example.com",
                "company_name": "Verma Motors",
                "last_service_date": "2026-05-20",
                "service_type": "Oil Change",
                "vehicle_number": "MP04CD5678",
            },
            {
                "name": "Priya Singh",
                "phone": "9988776655",
                "email": "priya@example.com",
                "company_name": "Singh Auto Care",
                "last_service_date": "2026-07-10",
                "service_type": "Tyre Change",
                "vehicle_number": "MP04EF9012",
            },
        ]

        for data in customers:
            Customer.objects.update_or_create(
                phone=data["phone"],
                defaults=data,
            )

        self.stdout.write(
            self.style.SUCCESS("Demo customer data seeded successfully.")
        )