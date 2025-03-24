import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Added these to enable App.tsx and bootstrap (using the full path for bootstrap)
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
