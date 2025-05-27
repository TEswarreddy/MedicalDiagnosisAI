import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    mainSymptoms: "",
    symptomDetails: "",
    healthIssues: "",
    socialHistory: "",
    medications: "",
    tests: "",
    reports: [],
    xrayImages: [],
  });

  const [errors, setErrors] = useState({});

  const [reportPreviews, setReportPreviews] = useState([]);
  const [xrayPreviews, setXrayPreviews] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleFileChange(e, fieldName) {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, [fieldName]: files }));

    const previews = files.map((file) => URL.createObjectURL(file));
    if (fieldName === "reports") setReportPreviews(previews);
    else if (fieldName === "xrayImages") setXrayPreviews(previews);
  }

  useEffect(() => {
    return () => {
      reportPreviews.forEach((url) => URL.revokeObjectURL(url));
      xrayPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [reportPreviews, xrayPreviews]);

  function validateStep() {
    let stepErrors = {};
    switch (step) {
      case 1:
        if (!formData.age) stepErrors.age = "Age is required";
        else if (Number(formData.age) <= 0)
          stepErrors.age = "Age must be positive";
        if (!formData.gender) stepErrors.gender = "Gender is required";
        break;
      case 2:
        if (!formData.mainSymptoms)
          stepErrors.mainSymptoms = "Main symptoms is required";
        break;
      case 3:
        if (!formData.symptomDetails)
          stepErrors.symptomDetails = "Symptom details are required";
        break;
      case 4:
        if (!formData.healthIssues)
          stepErrors.healthIssues = "Health issues details required";
        if (!formData.socialHistory)
          stepErrors.socialHistory = "Social history is required";
        break;
      case 5:
        if (!formData.medications)
          stepErrors.medications = "Medications info required";
        if (!formData.tests) stepErrors.tests = "Tests info required";
        break;
      case 6:
        if (formData.reports.length === 0)
          stepErrors.reports = "Please upload at least one report image";
        if (formData.xrayImages.length === 0)
          stepErrors.xrayImages = "Please upload at least one x-ray image";
        break;
      default:
        break;
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }

  function nextStep() {
    if (validateStep()) {
      setStep((s) => Math.min(s + 1, 6));
    }
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 1));
  }


function handleSubmit(e) {
  e.preventDefault();
  if (validateStep()) {
    const data = new FormData();

    // Append text fields
    for (const key in formData) {
      if (key === "reports" || key === "xrayImages") continue; // skip files here
      data.append(key, formData[key]);
    }

    // Append files
    formData.reports.forEach(file => data.append("reports", file));
    formData.xrayImages.forEach(file => data.append("xrayImages", file));
    console.log("Form data to be sent:", formData);
    // Send form data using axios
    axios.post("http://127.0.0.1:8000/predict/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      // Optional: track upload progress
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`Upload progress: ${percentCompleted}%`);
      },
    })
    .then((response) => {
      console.log("Server response:", response.data);
      alert("Form submitted successfully!");
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
      alert("Error submitting form.");
    });
  }
}


  function renderStep() {
    switch (step) {
      case 1:
        return (
          <>
            <label className="block mb-2">
              Age:
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={`border p-2 w-full rounded mt-1 ${
                  errors.age ? "border-red-500" : ""
                }`}
                min="0"
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age}</p>
              )}
            </label>
            <label className="block mb-2">
              Gender:
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`border p-2 w-full rounded mt-1 ${
                  errors.gender ? "border-red-500" : ""
                }`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </label>
          </>
        );
      case 2:
        return (
          <label className="block mb-2">
            What is your main symptoms:
            <input
              type="text"
              name="mainSymptoms"
              value={formData.mainSymptoms}
              onChange={handleChange}
              className={`border p-2 w-full rounded mt-1 ${
                errors.mainSymptoms ? "border-red-500" : ""
              }`}
            />
            {errors.mainSymptoms && (
              <p className="text-red-500 text-sm mt-1">{errors.mainSymptoms}</p>
            )}
          </label>
        );
      case 3:
        return (
          <label className="block mb-2">
            Describe the details of your symptoms:
            <textarea
              name="symptomDetails"
              value={formData.symptomDetails}
              onChange={handleChange}
              className={`border p-2 w-full rounded mt-1 ${
                errors.symptomDetails ? "border-red-500" : ""
              }`}
              rows={4}
            />
            {errors.symptomDetails && (
              <p className="text-red-500 text-sm mt-1">{errors.symptomDetails}</p>
            )}
          </label>
        );
      case 4:
        return (
          <>
            <label className="block mb-2">
              Relevant health issues and surgeries:
              <textarea
                name="healthIssues"
                value={formData.healthIssues}
                onChange={handleChange}
                className={`border p-2 w-full rounded mt-1 ${
                  errors.healthIssues ? "border-red-500" : ""
                }`}
                rows={3}
              />
              {errors.healthIssues && (
                <p className="text-red-500 text-sm mt-1">{errors.healthIssues}</p>
              )}
            </label>
            <label className="block mb-2">
              Social history:
              <textarea
                name="socialHistory"
                value={formData.socialHistory}
                onChange={handleChange}
                className={`border p-2 w-full rounded mt-1 ${
                  errors.socialHistory ? "border-red-500" : ""
                }`}
                rows={3}
              />
              {errors.socialHistory && (
                <p className="text-red-500 text-sm mt-1">{errors.socialHistory}</p>
              )}
            </label>
          </>
        );
      case 5:
        return (
          <>
            <label className="block mb-2">
              Please list your current or recently used medications:
              <textarea
                name="medications"
                value={formData.medications}
                onChange={handleChange}
                className={`border p-2 w-full rounded mt-1 ${
                  errors.medications ? "border-red-500" : ""
                }`}
                rows={3}
              />
              {errors.medications && (
                <p className="text-red-500 text-sm mt-1">{errors.medications}</p>
              )}
            </label>
            <label className="block mb-2">
              Please list any relevant tests:
              <textarea
                name="tests"
                value={formData.tests}
                onChange={handleChange}
                className={`border p-2 w-full rounded mt-1 ${
                  errors.tests ? "border-red-500" : ""
                }`}
                rows={3}
              />
              {errors.tests && (
                <p className="text-red-500 text-sm mt-1">{errors.tests}</p>
              )}
            </label>
          </>
        );
      case 6:
        return (
          <>
            <label className="block mb-4">
              Reports (multiple images):
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileChange(e, "reports")}
                className={`block mt-1 ${
                  errors.reports ? "border border-red-500" : ""
                }`}
              />
              {errors.reports && (
                <p className="text-red-500 text-sm mt-1">{errors.reports}</p>
              )}
            </label>

            <div className="flex flex-wrap gap-2 mb-4">
              {reportPreviews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`report preview ${i + 1}`}
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>

            <label className="block mb-4">
              X-rays (multiple images):
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileChange(e, "xrayImages")}
                className={`block mt-1 ${
                  errors.xrayImages ? "border border-red-500" : ""
                }`}
              />
              {errors.xrayImages && (
                <p className="text-red-500 text-sm mt-1">{errors.xrayImages}</p>
              )}
            </label>

            <div className="flex flex-wrap gap-2">
              {xrayPreviews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`xray preview ${i + 1}`}
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-semibold mb-4">Step {step} of 6</h2>
      <form
        onSubmit={
          step === 6 ? handleSubmit : (e) => {
            e.preventDefault();
            nextStep();
          }
        }
      >
        {renderStep()}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          <button
            type="submit"
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 bg-sky-500 hover:bg-sky-700"
          >
            {step === 6 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
