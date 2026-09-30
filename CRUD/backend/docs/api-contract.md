# Automobile Automation API Contract

## Base URL

http://127.0.0.1:8000


# 1. Customer APIs

## 1.1 List Customers

### Endpoint

GET /api/customers/

### Purpose

Returns the list of all customers.

### Response

```json
[
  {
    "id": 1,
    "name": "Rahul Sharma",
    "phone": "9876543210",
    "email": "rahul@example.com",
    "company_name": "Rahul Auto Service",
    "last_service_date": "2026-06-15",
    "service_type": "Car Service",
    "vehicle_number": "MP04AB1234"
  }
]