import { StrictMode } from 'react'
import ReactDoM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

ReactDoM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)