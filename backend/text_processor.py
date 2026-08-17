import re
import string
from typing import List

class TextProcessor:
    """Text cleaning and preprocessing for telecom support tickets"""
    
    @staticmethod
    def clean_text(text: str) -> str:
        """Clean and normalize text for embedding"""
        if not text:
            return ""
        
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters but keep spaces and basic punctuation
        text = re.sub(r'[^\w\s\.,!?-]', '', text)
        
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        
        # Remove URLs
        text = re.sub(r'http\S+|www\S+', '', text)
        
        # Remove email addresses
        text = re.sub(r'\S+@\S+', '', text)
        
        # Remove phone numbers (keep for context but normalize)
        text = re.sub(r'(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4})', 'PHONE_NUMBER', text)
        
        return text
    
    @staticmethod
    def extract_keywords(text: str) -> List[str]:
        """Extract relevant keywords for telecom context"""
        telecom_keywords = [
            'internet', 'slow', 'fast', 'speed', 'wifi', 'connection',
            'billing', 'charge', 'payment', 'invoice', 'refund', 'cost',
            'fiber', 'optic', 'cable', 'wired', 'ethernet',
            'mobile', 'cell', 'phone', '4g', '5g', 'lte', 'signal',
            'router', 'modem', 'device', 'equipment', 'hardware',
            'outage', 'down', 'unavailable', 'not working',
            'data', 'usage', 'limit', 'cap', 'throttle',
            'installation', 'setup', 'configure', 'upgrade'
        ]
        
        text_lower = text.lower()
        found_keywords = [kw for kw in telecom_keywords if kw in text_lower]
        return found_keywords
    
    @staticmethod
    def normalize_complaint(text: str) -> str:
        """Normalize complaint text for ML processing"""
        cleaned = TextProcessor.clean_text(text)
        # Add context markers
        keywords = TextProcessor.extract_keywords(text)
        if keywords:
            cleaned = f"COMPLAINT: {cleaned} KEYWORDS: {' '.join(keywords)}"
        return cleaned
