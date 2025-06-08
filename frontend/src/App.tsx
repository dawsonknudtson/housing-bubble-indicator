import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import ScoreGauge from './components/ScoreGauge'
import { useAvailableYears } from './hooks/useBubbleScore'

const queryClient = new QueryClient()

function Dashboard() {
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined)
  const { data: yearsData, isLoading: yearsLoading } = useAvailableYears()
  
  const years = yearsData?.years || []
  const currentYear = new Date().getFullYear()
  
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 700, 
          color: '#2c3e50',
          margin: '0 0 0.5rem 0'
        }}>
          housing bubble indicator
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#7f8c8d',
          margin: 0
        }}>
          real-time analysis of housing market bubble risk using price-to-income and price-to-rent ratios
        </p>
      </header>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '1rem', 
          fontWeight: 600,
          color: '#34495e',
          marginBottom: '0.5rem'
        }}>
          select year:
        </label>
        <select 
          value={selectedYear || ''} 
          onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : undefined)}
          style={{
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            border: '2px solid #bdc3c7',
            borderRadius: '8px',
            background: 'white',
            color: '#000000',
            textAlign: 'center',
            minWidth: '200px'
          }}
          disabled={yearsLoading}
        >
          <option value="">latest available data</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <ScoreGauge year={selectedYear} />

      <footer style={{ 
        textAlign: 'center', 
        marginTop: '3rem',
        padding: '2rem',
        background: '#ecf0f1',
        borderRadius: '8px'
      }}>
        <h3 style={{ 
          fontSize: '1.2rem', 
          color: '#2c3e50',
          margin: '0 0 1rem 0'
        }}>
          how it works
        </h3>
        <div style={{ 
          fontSize: '0.95rem', 
          color: '#5d6d7e',
          lineHeight: 1.6
        }}>
          <p style={{ margin: '0 0 1rem 0' }}>
            this indicator combines price-to-income and price-to-rent ratios, normalized against historical data from 1987-2019.
          </p>
          <p style={{ margin: 0 }}>
            scores above 80% indicate extreme bubble risk, while scores below 40% suggest healthy market conditions.
          </p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  )
}

export default App
