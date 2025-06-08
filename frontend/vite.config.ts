import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{ proxy: { 
    '/score': 'http://localhost:8000',
    '/years': 'http://localhost:8000',
    '/timeseries': 'http://localhost:8000'
  } }
})
