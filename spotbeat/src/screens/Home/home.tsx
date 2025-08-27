import { useState, useEffect } from "react"
import './home.css'

export default function Home() {
  const [city, setCity] = useState<string>('')
  const [visible, setVisible] = useState(false) // for fade-in

  // Fade in on mount
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50) // trigger fade in
    return () => clearTimeout(timer)
  }, [])

  const handleIndex = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8000/api/getEvents?city=${encodeURIComponent(city)}`)
      const songs = await res.json()
      console.log(songs)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={`home-page-container ${visible ? 'show' : ''}`}>
      <form onSubmit={handleIndex}>
        <input
          className="input-home-page"
          style={{ height: '60px', width: '50rem', borderRadius: '20px', backgroundColor: 'white', color: 'black' }}
          placeholder="Search for events in your city"
          value={city}
          name='city'
          onChange={(e) => setCity(e.target.value)} />
        <button
          type='submit'
          className='button-lookup'
          style={{ borderRadius: '20px', marginLeft: '20px', width: '10rem', height: '60px' }}
        >
          Lookup
        </button>
      </form>
    </div>
  );
}
