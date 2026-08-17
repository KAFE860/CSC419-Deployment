# Telecom Ticket Routing System

An intelligent support ticket routing system for telecommunications companies that uses machine learning to automatically classify and prioritize customer complaints.

## Features

- **Intelligent Routing**: Uses SBERT embeddings and Random Forest classification to automatically route tickets to the correct department
- **Text Processing**: Advanced text cleaning and preprocessing for complaint analysis
- **Priority Scoring**: Automatic priority calculation based on complaint content and model confidence
- **Real-time Dashboard**: Live statistics and ticket overview
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## Departments

The system routes tickets to these departments:
- Billing
- Fiber-Optic Tech
- Mobile Network
- General Support
- Equipment/Installation

## Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **Sentence-Transformers (SBERT)**: State-of-the-art text embeddings
- **scikit-learn**: Random Forest classifier
- **SQLite**: Lightweight database

### Frontend
- **React**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Axios**: HTTP client

## Installation

### Backend Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Start the FastAPI server:
```bash
cd backend
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Install Node.js dependencies:
```bash
npm install
```

2. Start the Vite dev server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Usage

1. Navigate to `http://localhost:3000`
2. View the dashboard for statistics
3. Create new tickets via the "New Ticket" tab
4. View and manage tickets in the "Tickets" tab
5. Filter tickets by department or status
6. Update ticket status or delete tickets as needed

## API Endpoints

- `POST /api/tickets` - Create a new ticket
- `GET /api/tickets` - Get all tickets (with optional filters)
- `GET /api/tickets/{id}` - Get a specific ticket
- `PUT /api/tickets/{id}/status` - Update ticket status
- `DELETE /api/tickets/{id}` - Delete a ticket
- `GET /api/departments` - Get list of departments
- `GET /api/stats/dashboard` - Get dashboard statistics

## How It Works

1. **Text Processing**: Complaint text is cleaned and normalized
2. **Embedding**: SBERT generates semantic embeddings of the text
3. **Classification**: Random Forest classifier predicts the appropriate department
4. **Priority Scoring**: Priority is calculated based on keywords and model confidence
5. **Routing**: Ticket is stored with routing information for support agents

## Machine Learning Model

The system uses:
- **SBERT (all-MiniLM-L6-v2)**: For generating text embeddings
- **Random Forest (100 estimators)**: For department classification
- **Sample training data**: Pre-loaded with 20 labeled examples

## Sample Data

The system comes pre-loaded with training data covering common telecom scenarios:
- Billing issues (charges, refunds, invoices)
- Fiber-optic problems (connection, speed, outages)
- Mobile network issues (signal, 5G, dropped calls)
- General support inquiries
- Equipment and installation requests

## Future Enhancements

- Add more training data for better accuracy
- Implement user authentication
- Add email notifications for ticket assignments
- Export tickets to CSV/PDF
- Add ticket analytics and reporting
- Integrate with actual telecom systems
