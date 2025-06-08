## How to Run

### Backend (FastAPI)
```bash
cd backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
The backend will be available at `http://localhost:8000`

### Frontend (React + Vite)
```bash
cd frontend
npm run dev
```
The frontend will be available at `http://localhost:5173`

---

## Project Structure

```
housing-bubble-indicator/
├─ README.md                ← project overview & quick-start
├─ .gitignore
├─ data/                    ← *only* version-controlled tiny CSVs or scripts to pull them
│  └─ fetch_data.py         ← one-off script that writes data/raw/*.csv
│
├─ backend/
│  ├─ app/
│  │   ├─ __init__.py
│  │   ├─ main.py           ← FastAPI entry-point (`uvicorn app.main:app`)
│  │   ├─ core/
│  │   │   └─ config.py     ← env vars, CORS domains, paths
│  │   ├─ services/
│  │   │   ├─ bubble_calc.py    ← ratios → z-scores → score
│  │   │   └─ anomaly.py        ← IsolationForest (optional)
│  │   └─ api/
│  │       └─ v1.py         ← `/score`, `/series`, `/health`
│  ├─ requirements.txt
│  └─ Dockerfile            ← `FROM python:3.12-slim`
│
├─ frontend/
│  ├─ src/
│  │   ├─ components/
│  │   │   ├─ ScoreGauge.tsx
│  │   │   ├─ BubbleChart.tsx
│  │   │   └─ RegionSelect.tsx 
│  │   ├─ hooks/
│  │   │   └─ useBubbleScore.ts
│  │   ├─ pages/
│  │   │   └─ Home.tsx      ← assembles the dashboard
│  │   ├─ App.tsx
│  │   └─ index.tsx
│  ├─ public/
│  ├─ vite.config.ts
│  ├─ package.json
│  └─ tsconfig.json
│
├─ scripts/                 ← one-liners you'll reuse (e.g., `docker_dev.sh`)
├─ docker-compose.yml       ← `api` + `ui` services for local dev
└─ vercel.json / render.yaml← deploy configs (copy-paste friendly)
```
