import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ScoreGauge from './components/ScoreGauge'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScoreGauge />
    </QueryClientProvider>
  )
}

export default App
