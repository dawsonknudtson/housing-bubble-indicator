import { useBubbleScore } from '../hooks/useBubbleScore'

interface ScoreGaugeProps {
  year?: number
}

export default function ScoreGauge({ year }: ScoreGaugeProps) {
  const { data, isLoading } = useBubbleScore(year)
  
  if (isLoading || !data) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '18px', color: '#666' }}>loading bubble score...</div>
    </div>
  )
  
  const { score, date } = data
  const color = score >= 80 ? '#e74c3c' : score >= 60 ? '#f39c12'
               : score <= 40 ? '#27ae60' : '#95a5a6'
  
  const riskLevel = score >= 80 ? 'extreme bubble risk' : score >= 60 ? 'high bubble risk'
                  : score <= 40 ? 'low bubble risk' : 'moderate bubble risk'
  
  const yearFromDate = new Date(date).getFullYear()
  
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '2rem',
      background: '#f8f9fa',
      borderRadius: '12px',
      border: '1px solid #e9ecef'
    }}>
      <div style={{ fontSize: '16px', color: '#6c757d', marginBottom: '1rem' }}>
        housing bubble indicator
      </div>
      <div style={{ fontSize: '64px', color, fontWeight: 700, lineHeight: 1 }}>
        {score}%
      </div>
      <div style={{ fontSize: '18px', color, fontWeight: 600, margin: '0.5rem 0' }}>
        {riskLevel}
      </div>
      <div style={{ fontSize: '14px', color: '#6c757d' }}>
        {yearFromDate} data • last updated {date}
      </div>
    </div>
  )
}
