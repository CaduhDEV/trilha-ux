import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// captura cedo o aviso de "pode instalar" do Android, antes de qualquer tela montar
import './lib/install'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
