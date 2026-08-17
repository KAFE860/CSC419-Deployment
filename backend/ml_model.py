import json
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from typing import List, Tuple, Dict
import pickle

class TicketRouter:
    """ML-based ticket routing system using SBERT and Random Forest"""
    
    DEPARTMENTS = [
        "Billing",
        "Fiber-Optic Tech",
        "Mobile Network",
        "General Support",
        "Equipment/Installation"
    ]
    
    def __init__(self):
        self.sbert_model = SentenceTransformer('all-MiniLM-L6-v2')
        self.rf_classifier = RandomForestClassifier(n_estimators=100, random_state=42)
        self.is_trained = False
        
    def embed_text(self, text: str) -> np.ndarray:
        """Generate SBERT embedding for text"""
        return self.sbert_model.encode(text)
    
    def train(self, training_data: List[Dict[str, str]]):
        """
        Train the Random Forest classifier
        training_data: list of dicts with 'text' and 'department' keys
        """
        texts = [item['text'] for item in training_data]
        labels = [item['department'] for item in training_data]
        
        # Generate embeddings
        embeddings = self.sbert_model.encode(texts)
        
        # Train classifier
        self.rf_classifier.fit(embeddings, labels)
        self.is_trained = True
        
    def predict_department(self, text: str) -> Tuple[str, float]:
        """
        Predict the appropriate department for a ticket
        Returns: (department, confidence_score)
        """
        if not self.is_trained:
            # Default to General Support if not trained
            return "General Support", 0.5
            
        embedding = self.embed_text(text).reshape(1, -1)
        prediction = self.rf_classifier.predict(embedding)[0]
        probabilities = self.rf_classifier.predict_proba(embedding)[0]
        confidence = float(max(probabilities))
        
        return prediction, confidence
    
    def save_model(self, path: str = "model.pkl"):
        """Save the trained model"""
        with open(path, 'wb') as f:
            pickle.dump(self.rf_classifier, f)
    
    def load_model(self, path: str = "model.pkl"):
        """Load a trained model"""
        with open(path, 'rb') as f:
            self.rf_classifier = pickle.load(f)
        self.is_trained = True

# Sample training data for demonstration
SAMPLE_TRAINING_DATA = [
    {"text": "my bill is too high and i was charged extra", "department": "Billing"},
    {"text": "i need a refund for overpayment", "department": "Billing"},
    {"text": "wrong amount on my invoice this month", "department": "Billing"},
    {"text": "payment not showing in my account", "department": "Billing"},
    {"text": "fiber optic connection is down", "department": "Fiber-Optic Tech"},
    {"text": "internet speed is very slow on fiber", "department": "Fiber-Optic Tech"},
    {"text": "fiber cable cut outside my house", "department": "Fiber-Optic Tech"},
    {"text": "no internet connection on wired line", "department": "Fiber-Optic Tech"},
    {"text": "mobile signal is weak in my area", "department": "Mobile Network"},
    {"text": "5g not working on my phone", "department": "Mobile Network"},
    {"text": "dropped calls on cellular network", "department": "Mobile Network"},
    {"text": "cell data not connecting", "department": "Mobile Network"},
    {"text": "need help with my account settings", "department": "General Support"},
    {"text": "how do i change my password", "department": "General Support"},
    {"text": "general inquiry about services", "department": "General Support"},
    {"text": "router not working after power outage", "department": "Equipment/Installation"},
    {"text": "need new modem installation", "department": "Equipment/Installation"},
    {"text": "equipment damaged need replacement", "department": "Equipment/Installation"},
    {"text": "setup wifi for new apartment", "department": "Equipment/Installation"},
]
