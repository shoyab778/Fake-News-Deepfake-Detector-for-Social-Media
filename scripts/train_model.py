"""
Perfect BERT Fine-tuning Script for Fake News Detection
This script combines multiple datasets and fine-tunes BERT/RoBERTa for optimal performance
"""

import pandas as pd
import numpy as np
from transformers import (
    AutoTokenizer, AutoModelForSequenceClassification,
    TrainingArguments, Trainer, pipeline
)
from datasets import Dataset
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
import torch
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class FakeNewsTrainer:
    def __init__(self, model_name="roberta-base"):
        self.model_name = model_name
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForSequenceClassification.from_pretrained(
            model_name, 
            num_labels=2,
            problem_type="single_label_classification"
        )
        
    def load_and_combine_datasets(self):
        """
        Load and combine the best fake news datasets
        """
        logger.info("Loading datasets...")
        
        # Simulated dataset loading - replace with actual dataset paths
        datasets = []
        
        # LIAR Dataset (Political statements)
        liar_data = {
            'text': [
                "The unemployment rate has dropped to historic lows under current administration",
                "Scientists have proven that vaccines cause autism in 90% of children",
                "The economy grew by 3.2% last quarter according to official statistics"
            ],
            'label': [1, 0, 1],  # 1 = Real, 0 = Fake
            'source': ['liar'] * 3
        }
        
        # ISOT Fake News Dataset
        isot_data = {
            'text': [
                "BREAKING: Celebrity spotted with mysterious illness, doctors baffled",
                "Federal Reserve announces new interest rate policy following economic indicators",
                "SHOCKING: This one weird trick will make you rich overnight"
            ],
            'label': [0, 1, 0],
            'source': ['isot'] * 3
        }
        
        # FakeNewsNet Dataset
        fakenet_data = {
            'text': [
                "Local community comes together to support flood victims with donations",
                "URGENT: Government hiding truth about alien contact, whistleblower reveals all",
                "New study shows correlation between exercise and mental health improvement"
            ],
            'label': [1, 0, 1],
            'source': ['fakenet'] * 3
        }
        
        # Combine all datasets
        all_data = {
            'text': liar_data['text'] + isot_data['text'] + fakenet_data['text'],
            'label': liar_data['label'] + isot_data['label'] + fakenet_data['label'],
            'source': liar_data['source'] + isot_data['source'] + fakenet_data['source']
        }
        
        df = pd.DataFrame(all_data)
        logger.info(f"Combined dataset size: {len(df)}")
        logger.info(f"Label distribution:\n{df['label'].value_counts()}")
        
        return df
    
    def preprocess_data(self, df):
        """
        Preprocess text data for BERT training
        """
        logger.info("Preprocessing data...")
        
        # Clean and prepare text
        df['text'] = df['text'].str.strip()
        df['text'] = df['text'].str.replace(r'\s+', ' ', regex=True)
        
        # Split data
        train_texts, val_texts, train_labels, val_labels = train_test_split(
            df['text'].tolist(),
            df['label'].tolist(),
            test_size=0.2,
            random_state=42,
            stratify=df['label']
        )
        
        # Tokenize
        train_encodings = self.tokenizer(
            train_texts,
            truncation=True,
            padding=True,
            max_length=512,
            return_tensors='pt'
        )
        
        val_encodings = self.tokenizer(
            val_texts,
            truncation=True,
            padding=True,
            max_length=512,
            return_tensors='pt'
        )
        
        # Create datasets
        train_dataset = Dataset.from_dict({
            'input_ids': train_encodings['input_ids'],
            'attention_mask': train_encodings['attention_mask'],
            'labels': train_labels
        })
        
        val_dataset = Dataset.from_dict({
            'input_ids': val_encodings['input_ids'],
            'attention_mask': val_encodings['attention_mask'],
            'labels': val_labels
        })
        
        return train_dataset, val_dataset
    
    def compute_metrics(self, eval_pred):
        """
        Compute evaluation metrics
        """
        predictions, labels = eval_pred
        predictions = np.argmax(predictions, axis=1)
        
        precision, recall, f1, _ = precision_recall_fscore_support(
            labels, predictions, average='weighted'
        )
        accuracy = accuracy_score(labels, predictions)
        
        return {
            'accuracy': accuracy,
            'f1': f1,
            'precision': precision,
            'recall': recall
        }
    
    def train(self, train_dataset, val_dataset):
        """
        Fine-tune the model
        """
        logger.info("Starting training...")
        
        training_args = TrainingArguments(
            output_dir='./results',
            num_train_epochs=3,
            per_device_train_batch_size=16,
            per_device_eval_batch_size=16,
            warmup_steps=500,
            weight_decay=0.01,
            logging_dir='./logs',
            logging_steps=10,
            evaluation_strategy="epoch",
            save_strategy="epoch",
            load_best_model_at_end=True,
            metric_for_best_model="f1",
            greater_is_better=True,
            report_to=None  # Disable wandb
        )
        
        trainer = Trainer(
            model=self.model,
            args=training_args,
            train_dataset=train_dataset,
            eval_dataset=val_dataset,
            compute_metrics=self.compute_metrics,
        )
        
        trainer.train()
        
        # Save the model
        trainer.save_model('./fake-news-detector')
        self.tokenizer.save_pretrained('./fake-news-detector')
        
        logger.info("Training completed and model saved!")
        
        return trainer

def main():
    """
    Main training pipeline
    """
    # Initialize trainer
    trainer = FakeNewsTrainer("roberta-base")
    
    # Load and prepare data
    df = trainer.load_and_combine_datasets()
    train_dataset, val_dataset = trainer.preprocess_data(df)
    
    # Train model
    trained_model = trainer.train(train_dataset, val_dataset)
    
    # Test the trained model
    classifier = pipeline(
        "text-classification",
        model="./fake-news-detector",
        tokenizer="./fake-news-detector"
    )
    
    # Test examples
    test_texts = [
        "BREAKING: Scientists discover cure for aging, pharmaceutical companies hate this one trick!",
        "The Federal Reserve announced a 0.25% interest rate increase following their monthly meeting.",
        "Local school district receives grant funding for new computer lab equipment."
    ]
    
    print("\n=== Model Testing ===")
    for text in test_texts:
        result = classifier(text)[0]
        label = "REAL" if result['label'] == 'LABEL_1' else "FAKE"
        confidence = result['score'] * 100
        print(f"Text: {text[:60]}...")
        print(f"Prediction: {label} ({confidence:.1f}% confidence)\n")

if __name__ == "__main__":
    main()
