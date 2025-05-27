from fastapi import APIRouter, UploadFile, File, Form
from app.services.diagnosis_service import predict_disease

router = APIRouter()

@router.post("/predict")
async def predict_disease_route(
    age: int = Form(...),
    gender: str = Form(...),
    mainSymptoms: str = Form(...),
    symptomDetails: str = Form(...),
    healthIssues: str = Form(...),
    socialHistory: str = Form(...),
    medications: str = Form(...),
    tests: str = Form(...),
    xrayImages: list[UploadFile] = File([]),
    reports: list[UploadFile] = File([]),
):
    result = await predict_disease(
        age, gender, mainSymptoms, symptomDetails,
        healthIssues, socialHistory, medications, tests,
        xrayImages, reports
    )
    return result
