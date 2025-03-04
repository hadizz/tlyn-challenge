import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

document.documentElement.classList.add('dark')

createRoot(document.getElementById('root')!).render(
  <App />
)