from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import diagnosis

app = FastAPI()

# Allow all origins (you can limit it to specific origins later for security)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (change this to a list of trusted origins if needed)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

app.include_router(diagnosis.router)

@app.get("/")
def health_check():
    return {"status": "OK"}