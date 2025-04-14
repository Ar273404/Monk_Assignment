import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QuizProvider } from './QuizContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <QuizProvider>
    <BrowserRouter>
     <App />
    </BrowserRouter>
   </QuizProvider>
  </StrictMode>,
)
