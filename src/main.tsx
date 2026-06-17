import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { PhoneFrame } from './components/PhoneFrame'
import { CatchBallGate } from './components/CatchBallGate'
import { SpinPage } from './pages/SpinPage'
import './styles.css'

// Double variant — Spin (Putar Roda) game served at telkomsel4double on port 5288.
// A 60s "Tangkap Bola" mission gates the undian: play it first, then continue.
function Root() {
  const [passed, setPassed] = useState(false)
  if (!passed) return <CatchBallGate onComplete={() => setPassed(true)} nextAction="putar spin wheel" nextButton="SPIN" />
  return <SpinPage />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <PhoneFrame>
        <Root />
      </PhoneFrame>
    </MotionConfig>
  </StrictMode>,
)
