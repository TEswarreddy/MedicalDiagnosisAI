from app.utils.data_processing import preprocess_inputs
#from app.services.ai_model import run_model_inference

async def predict_disease(age, gender, mainSymptoms, symptomDetails,
                          healthIssues, socialHistory, medications, tests,
                          xrayImages, reports):
    data = await preprocess_inputs(age, gender, mainSymptoms, symptomDetails,
                                   healthIssues, socialHistory, medications, tests,
                                   xrayImages, reports)
    #prediction = run_model_inference(data)
    return {"prediction": data}
