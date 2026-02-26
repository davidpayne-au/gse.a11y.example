import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Apply stored theme before first render to prevent flash
const storedTheme = localStorage.getItem('theme')
if (storedTheme === 'dark') {
  document.documentElement.classList.add('dark')
}

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
