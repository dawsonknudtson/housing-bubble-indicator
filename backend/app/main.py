from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.bubble_calc import compute_bubble_score

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # default vite dev server 
    allow_methods=["*"], allow_headers=["*"]
)

@app.get("/score")
def score():
    date, value = compute_bubble_score()
    return {"date": date.date().isoformat(), "score": value} 