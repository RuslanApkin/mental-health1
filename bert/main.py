from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
import torch

app = FastAPI()

device = 0 if torch.cuda.is_available() else -1

classifier = pipeline("text-classification",
                      model="j-hartmann/emotion-english-distilroberta-base",
                      device=device,
                      top_k=None)

@app.get("/")
async def root():
    return {"message": "Hello World"}

class TextRequest(BaseModel):
    text: str

@app.post("/emotions")
async def get_emotions(request: TextRequest):
    try:
        results = classifier(request.text)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
