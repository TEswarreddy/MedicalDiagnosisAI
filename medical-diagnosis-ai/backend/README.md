 # Create the virtual environment

    python -m venv venv

# Activate the virtual environment

On Windows:

    venv\Scripts\activate

On macOS / Linux:

    source venv/bin/activate


# Save dependencies to requirements.txt

    pip freeze > requirements.txt

# Install your dependencies

    pip install -r requirements.txt

# Run FastAPI Backend
From inside backend/app:

    uvicorn app.main:app --reload