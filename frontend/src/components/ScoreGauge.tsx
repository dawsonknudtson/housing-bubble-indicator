import { useBubbleScore } from '../hooks/useBubbleScore'
export default function ScoreGauge() {
  const { data, isLoading } = useBubbleScore()
  if (isLoading || !data) return <>Loading…</>
  const { score } = data
  const color = score >= 80 ? 'red' : score >= 60 ? 'orange'
               : score <= 40 ? 'green' : 'gray'
  return (
    <div style={{ fontSize: 48, color, fontWeight: 700 }}>
      {score}
    </div>
  )
}
