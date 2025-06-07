from pathlib import Path
import pandas as pd
from scipy.special import expit

DATA_DIR = Path(__file__).parents[3] / "data" / "raw"

def load_series():
    # parse_dates and index_col are currently not being used, due to raw data being wrong format 
    price  = pd.read_csv(DATA_DIR / "price.csv",  parse_dates=True, index_col=0)
    rent   = pd.read_csv(DATA_DIR / "rent.csv",   parse_dates=True, index_col=0)
    income = pd.read_csv(DATA_DIR / "income.csv", parse_dates=True, index_col=0)
    
    price = price.iloc[:, 0].dropna()
    rent = rent.iloc[:, 0].dropna()
    income = income.iloc[:, 0].dropna()
    
    income = income.resample("MS").ffill()
    
    return price, rent, income

def compute_bubble_score() -> tuple[pd.Timestamp, float]:
    price, rent, income = load_series()
    
    common_dates = price.index.intersection(rent.index).intersection(income.index)
    
    if len(common_dates) == 0:
        return pd.Timestamp.now(), 0.0
        
    price = price[common_dates]
    rent = rent[common_dates]
    income = income[common_dates]

    pr = price / rent 
    pi = price / income

    normal = slice("1987-01-01", "2019-12-31")
    z_pr = (pr - pr[normal].mean()) / pr[normal].std()
    z_pi = (pi - pi[normal].mean()) / pi[normal].std()

    raw_score = 0.6 * z_pr + 0.4 * z_pi
    score = 100 * expit(raw_score)

    latest_date = score.index[-1]
    return latest_date, round(score.iloc[-1], 1)

if __name__ == "__main__":
    print(compute_bubble_score())

