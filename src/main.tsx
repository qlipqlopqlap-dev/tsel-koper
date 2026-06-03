import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { PhoneFrame } from './components/PhoneFrame'
import { SpinPage } from './pages/SpinPage'
import './styles.css'

// Double variant — Spin (Putar Roda) game served at telkomsel4double on port 5288.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <PhoneFrame>
        <SpinPage />
      </PhoneFrame>
    </MotionConfig>
  </StrictMode>,
)
