from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import json

from database import get_db, Ticket
from text_processor import TextProcessor
from ml_model import TicketRouter, SAMPLE_TRAINING_DATA

app = FastAPI(title="Telecom Ticket Routing API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize ML model
ticket_router = TicketRouter()
ticket_router.train(SAMPLE_TRAINING_DATA)
print("ML model trained successfully!")

class TicketCreate(BaseModel):
    customer_name: str
    complaint_text: str

class TicketResponse(BaseModel):
    id: int
    customer_name: str
    complaint_text: str
    predicted_department: str
    confidence_score: float
    priority_score: float
    status: str
    created_at: str

def calculate_priority(complaint_text: str, confidence: float) -> float:
    """Calculate priority score based on complaint content and model confidence"""
    text_lower = complaint_text.lower()
    
    # High priority keywords
    high_priority = ['outage', 'down', 'emergency', 'no service', 'not working', 'urgent']
    medium_priority = ['slow', 'intermittent', 'issue', 'problem']
    
    base_score = 0.5
    
    for kw in high_priority:
        if kw in text_lower:
            base_score += 0.3
    
    for kw in medium_priority:
        if kw in text_lower:
            base_score += 0.15
    
    # Adjust based on model confidence (lower confidence = higher priority for human review)
    if confidence < 0.6:
        base_score += 0.2
    
    return min(base_score, 1.0)

@app.post("/api/tickets", response_model=TicketResponse)
async def create_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):
    """Create a new ticket and automatically route it"""
    # Process text
    processed_text = TextProcessor.normalize_complaint(ticket.complaint_text)
    
    # Predict department
    department, confidence = ticket_router.predict_department(processed_text)
    
    # Calculate priority
    priority = calculate_priority(ticket.complaint_text, confidence)
    
    # Generate embedding
    embedding = ticket_router.embed_text(processed_text)
    embedding_json = json.dumps(embedding.tolist())
    
    # Create ticket
    db_ticket = Ticket(
        customer_name=ticket.customer_name,
        complaint_text=ticket.complaint_text,
        predicted_department=department,
        confidence_score=confidence,
        priority_score=priority,
        embedding_vector=embedding_json
    )
    
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    
    # Convert datetime to string for response
    response_data = {
        "id": db_ticket.id,
        "customer_name": db_ticket.customer_name,
        "complaint_text": db_ticket.complaint_text,
        "predicted_department": db_ticket.predicted_department,
        "confidence_score": db_ticket.confidence_score,
        "priority_score": db_ticket.priority_score,
        "status": db_ticket.status,
        "created_at": db_ticket.created_at.isoformat()
    }
    
    return response_data

@app.get("/api/tickets", response_model=List[TicketResponse])
async def get_tickets(
    skip: int = 0,
    limit: int = 50,
    department: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get tickets with optional filtering, sorted by priority"""
    query = db.query(Ticket)
    
    if department:
        query = query.filter(Ticket.predicted_department == department)
    
    if status:
        query = query.filter(Ticket.status == status)
    
    # Sort by priority (descending) and then by creation time
    tickets = query.order_by(Ticket.priority_score.desc(), Ticket.created_at.desc()).offset(skip).limit(limit).all()
    
    # Convert datetime to string for response
    response_tickets = []
    for ticket in tickets:
        response_tickets.append({
            "id": ticket.id,
            "customer_name": ticket.customer_name,
            "complaint_text": ticket.complaint_text,
            "predicted_department": ticket.predicted_department,
            "confidence_score": ticket.confidence_score,
            "priority_score": ticket.priority_score,
            "status": ticket.status,
            "created_at": ticket.created_at.isoformat()
        })
    
    return response_tickets

@app.get("/api/tickets/{ticket_id}")
async def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
    """Get a specific ticket by ID"""
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    return {
        "id": ticket.id,
        "customer_name": ticket.customer_name,
        "complaint_text": ticket.complaint_text,
        "predicted_department": ticket.predicted_department,
        "confidence_score": ticket.confidence_score,
        "priority_score": ticket.priority_score,
        "status": ticket.status,
        "created_at": ticket.created_at.isoformat()
    }

@app.put("/api/tickets/{ticket_id}/status")
async def update_ticket_status(ticket_id: int, status: str, db: Session = Depends(get_db)):
    """Update ticket status"""
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    ticket.status = status
    db.commit()
    db.refresh(ticket)
    
    return {"message": "Status updated", "ticket_id": ticket_id, "status": status}

@app.get("/api/departments")
async def get_departments():
    """Get list of available departments"""
    return {"departments": TicketRouter.DEPARTMENTS}

@app.get("/api/stats/dashboard")
async def get_dashboard_stats(db: Session = Depends(get_db)):
    """Get dashboard statistics"""
    total_tickets = db.query(Ticket).count()
    
    # Tickets by department
    dept_counts = {}
    for dept in TicketRouter.DEPARTMENTS:
        count = db.query(Ticket).filter(Ticket.predicted_department == dept).count()
        dept_counts[dept] = count
    
    # Tickets by status
    pending = db.query(Ticket).filter(Ticket.status == "pending").count()
    in_progress = db.query(Ticket).filter(Ticket.status == "in_progress").count()
    resolved = db.query(Ticket).filter(Ticket.status == "resolved").count()
    
    # Average confidence
    avg_confidence = db.query(Ticket).count()
    if avg_confidence > 0:
        avg_confidence = db.query(Ticket).all()
        avg_confidence = sum(t.confidence_score for t in avg_confidence) / len(avg_confidence)
    else:
        avg_confidence = 0
    
    return {
        "total_tickets": total_tickets,
        "by_department": dept_counts,
        "by_status": {
            "pending": pending,
            "in_progress": in_progress,
            "resolved": resolved
        },
        "average_confidence": round(avg_confidence, 3)
    }

@app.delete("/api/tickets/{ticket_id}")
async def delete_ticket(ticket_id: int, db: Session = Depends(get_db)):
    """Delete a ticket"""
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    db.delete(ticket)
    db.commit()
    
    return {"message": "Ticket deleted", "ticket_id": ticket_id}
