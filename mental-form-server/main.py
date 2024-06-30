from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

model = joblib.load('./model/model.pkl')

@app.get("/")
async def root():
    return {"message": "Hello, Form"}

class InputData(BaseModel):
    age: int
    gender: int
    self_employed: int
    family_history: int
    no_employees: int
    remote_work: int
    benefits: int
    wellness_program: int
    seek_help: int
    leave: int
    mental_health_consequence: int
    coworkers: int
    supervisor: int
    mental_vs_physical: int

@app.post("/predict")
def predict(data: InputData):
    try:
        input_features = np.array([[
            data.age,
            data.self_employed,
            data.family_history,
            data.no_employees,
            data.remote_work,
            data.benefits,
            data.wellness_program,
            data.seek_help,
            data.leave,
            data.mental_health_consequence,
            data.coworkers,
            data.supervisor,
            data.mental_vs_physical,
            data.gender
        ]])

        prediction = model.predict(input_features)
        probabilities = model.predict_proba(input_features)

        return {
            "prediction": 0 if int(prediction[0]) == 0 else 1,
            "probabilities": probabilities.tolist()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
