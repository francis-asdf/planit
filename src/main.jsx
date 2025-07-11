import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Planit from './Planit.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Planit />
  </StrictMode>,
)
