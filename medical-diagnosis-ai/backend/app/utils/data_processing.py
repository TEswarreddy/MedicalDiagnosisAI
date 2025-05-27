from PIL import Image
import numpy as np
import io

async def preprocess_inputs(age, gender, mainSymptoms, symptomDetails,
                            healthIssues, socialHistory, medications, tests,
                            xrayImages, reports):
    # Example: encode categorical fields, vectorize text
    gender_encoded = 0 if gender.lower() == "male" else 1
    combined_symptoms = " ".join([mainSymptoms, symptomDetails, healthIssues])

    # ✅ Make this async
    async def image_to_array(file):
        image = Image.open(io.BytesIO(await file.read())).convert("L").resize((64, 64))
        return np.array(image).tolist()

    # ✅ Await the async function calls
    xray_array = [await image_to_array(f) for f in xrayImages]
    report_array = [await image_to_array(f) for f in reports]

    return {
        "age": age,
        "gender": gender_encoded,
        "symptoms_text": combined_symptoms,
        "social_history": socialHistory,
        "medications": medications,
        "tests": tests,
        "xray_images": xray_array,
        "report_images": report_array
    }
