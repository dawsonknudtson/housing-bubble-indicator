import { useBubbleTimeSeries, type TimeSeriesDataPoint } from '../hooks/useBubbleScore'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts'

interface BubbleChartProps {
  height?: number
}

const BubbleChart = ({ height = 400 }: BubbleChartProps) => {
  const { data: timeSeriesData, isLoading, error } = useBubbleTimeSeries()

  if (isLoading) {
    return (
      <div style={{ 
        height: `${height}px`, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f8f9fa',
        borderRadius: '8px',
        border: '2px solid #e9ecef'
      }}>
        <div style={{ fontSize: '1.1rem', color: '#6c757d' }}>
          Loading bubble chart...
        </div>
      </div>
    )
  }

  if (error || !timeSeriesData?.data) {
    return (
      <div style={{ 
        height: `${height}px`, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f8f9fa',
        borderRadius: '8px',
        border: '2px solid #e9ecef'
      }}>
        <div style={{ fontSize: '1.1rem', color: '#dc3545' }}>
          Error loading chart data
        </div>
      </div>
    )
  }

  // Transform data for the scatter chart
  const chartData = timeSeriesData.data.map((point: TimeSeriesDataPoint) => {
    const date = new Date(point.date)
    const yearFraction = date.getFullYear() + (date.getMonth() / 12)
    
    // Determine bubble size and color based on score
    let bubbleSize: number
    let fillColor: string
    
    if (point.score >= 80) {
      bubbleSize = 120 // Large for extreme risk
      fillColor = '#dc3545' // Red
    } else if (point.score >= 60) {
      bubbleSize = 80 // Medium for high risk  
      fillColor = '#fd7e14' // Orange
    } else if (point.score >= 40) {
      bubbleSize = 60 // Small-medium for moderate risk
      fillColor = '#ffc107' // Yellow
    } else {
      bubbleSize = 40 // Small for low risk
      fillColor = '#28a745' // Green
    }

    return {
      x: yearFraction,
      y: point.score,
      z: bubbleSize,
      fill: fillColor,
      date: point.date,
      score: point.score,
      originalDate: date.toLocaleDateString()
    }
  })

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '12px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
          <p style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: '#666' }}>
            <strong>Date:</strong> {data.originalDate}
          </p>
          <p style={{ margin: '0', fontSize: '0.9rem', color: '#333' }}>
            <strong>Bubble Score:</strong> {data.score}%
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 600, 
        color: '#2c3e50',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>
        Bubble Score Over Time
      </h2>
      
      <div style={{ 
        background: 'white',
        padding: '1rem',
        borderRadius: '8px',
        border: '2px solid #e9ecef'
      }}>
        <ResponsiveContainer width="100%" height={height}>
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
            data={chartData}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Year"
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value) => Math.round(value).toString()}
              axisLine={{ stroke: '#666' }}
              tickLine={{ stroke: '#666' }}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Score"
              domain={[0, 100]}
              axisLine={{ stroke: '#666' }}
              tickLine={{ stroke: '#666' }}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            
            {/* Reference lines for risk levels */}
            <ReferenceLine y={80} stroke="#dc3545" strokeDasharray="5 5" strokeWidth={2} />
            <ReferenceLine y={60} stroke="#fd7e14" strokeDasharray="5 5" strokeWidth={1} />
            <ReferenceLine y={40} stroke="#ffc107" strokeDasharray="5 5" strokeWidth={1} />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Scatter 
              data={chartData} 
              fill="#8884d8"
            />
          </ScatterChart>
        </ResponsiveContainer>
        
        {/* Legend */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '2rem', 
          marginTop: '1rem',
          fontSize: '0.85rem',
          color: '#555'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              backgroundColor: '#28a745' 
            }} />
            <span>Low Risk (&lt;40%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              backgroundColor: '#ffc107' 
            }} />
            <span>Moderate (40-60%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              backgroundColor: '#fd7e14' 
            }} />
            <span>High (60-80%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              backgroundColor: '#dc3545' 
            }} />
            <span>Extreme (&gt;80%)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BubbleChart
