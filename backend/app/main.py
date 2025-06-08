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
def score(year: int = None):
    date, value = compute_bubble_score(year)
    return {"date": date.date().isoformat(), "score": value}

@app.get("/years")
def available_years():
    from app.services.bubble_calc import get_available_years
    years = get_available_years()
    return {"years": years} 