from fredapi import Fred
import pandas as pd
from pathlib import Path
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

OUTPUT_DIR = Path(__file__).parent / "raw"
OUTPUT_DIR.mkdir(exist_ok=True)

fred = Fred(api_key=os.getenv('fred_api'))

series = {
    "price": "CSUSHPISA",        
    "rent": "CUSR0000SEHA",     
    "income": "MEHOINUSA672N",   
}

for name, code in series.items():
    df = fred.get_series(code, start="1987-01-01")
    df.to_csv(OUTPUT_DIR / f"{name}.csv", header=True)
    print(f" wrote {name}.csv - {len(df)} rows")