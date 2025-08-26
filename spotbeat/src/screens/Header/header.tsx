import './Header.css'

export function Header() {
  return (
    <div className="header-container">
      <div className="header-image-container">
        <img src="/logo.png" alt="SpotBeat Logo" />
      </div>

      <div className="header-title-container">
        <h1>SpotBeat</h1>
      </div>
    </div>
  )
}