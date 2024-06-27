from transformers import pipeline
from pydantic import BaseModel
import torch

device = 0 if torch.cuda.is_available() else -1

classifier = pipeline("text-classification",
                      model="j-hartmann/emotion-english-distilroberta-base",
                      device=device,
                      top_k=None)

result = classifier("I love this!")

print(result)
