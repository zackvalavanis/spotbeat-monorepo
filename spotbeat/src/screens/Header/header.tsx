import './Header.css'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const navigate = useNavigate()


  return (
    <div className="header-container">
      <div className="header-image-container">
        <img src="/logo.png" alt="SpotBeat Logo" />
      </div>

      <div className="header-title-container">
        <button
          onClick={() => navigate('/')}
          style={{ backgroundColor: '#fcfcfc', border: 'none', outline: 'none', cursor: 'pointer' }}
        >
          <h1>SpotBeat</h1>
        </button>
      </div>
    </div>
  )
}