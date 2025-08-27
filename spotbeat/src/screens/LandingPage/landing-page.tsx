import './landing-page.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

type Ripple = { x: number; y: number; id: number }

export function LandingPage() {
  const navigate = useNavigate()
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipples: Ripple[] = []
    for (let i = 0; i < 3; i++) {
      newRipples.push({ x, y, id: Date.now() + i }) // staggered ripples
    }

    setRipples([...ripples, ...newRipples])

    // Clear after animation + navigate
    setTimeout(() => {
      setRipples([])
      navigate('/aboutus')
    }, 900)
  }

  return (
    <div className="landing-page-container" onClick={handleClick}>
      {ripples.map((ripple, index) => (
        <span
          key={ripple.id}
          className="ripple ripple-wave"
          style={{
            top: ripple.y,
            left: ripple.x,
            animationDelay: `${index * 0.3}s`, // stagger like waves
          }}
        />
      ))}
      <h1>Welcome to SpotBeat</h1>
      <p>Discover the hottest events in your city, powered by real-time data.</p>
    </div>
  )
}
