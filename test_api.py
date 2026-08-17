import requests
import json

BASE_URL = "http://localhost:8001"

# Test creating tickets
sample_tickets = [
    {
        "customer_name": "John Smith",
        "complaint_text": "My internet is extremely slow, I can barely load web pages"
    },
    {
        "customer_name": "Sarah Johnson",
        "complaint_text": "I was charged twice on my bill this month, please fix this"
    },
    {
        "customer_name": "Mike Davis",
        "complaint_text": "Mobile signal is very weak in my neighborhood, calls keep dropping"
    },
    {
        "customer_name": "Emily Brown",
        "complaint_text": "Fiber connection has been down for 2 hours, urgent!"
    },
    {
        "customer_name": "David Wilson",
        "complaint_text": "Need help setting up my new router for home office"
    }
]

print("Creating sample tickets...")
for ticket in sample_tickets:
    response = requests.post(f"{BASE_URL}/api/tickets", json=ticket)
    print(f"Created ticket for {ticket['customer_name']}: {response.json()['predicted_department']} (confidence: {response.json()['confidence_score']:.2f})")

print("\nFetching all tickets...")
response = requests.get(f"{BASE_URL}/api/tickets")
tickets = response.json()
print(f"Total tickets: {len(tickets)}")

print("\nFetching dashboard stats...")
response = requests.get(f"{BASE_URL}/api/stats/dashboard")
stats = response.json()
print(json.dumps(stats, indent=2))

print("\nTest completed successfully!")
