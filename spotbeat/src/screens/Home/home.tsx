
import { useState } from "react"
import './home.css'

export default function LandingPage() {
  const [city, setCity] = useState<string>('')

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

  // useEffect(() => {
  //   handleIndex()
  // }, [])


  return (
    <div className="home-page-container">
      <form onSubmit={handleIndex}>
        <input
          style={{ height: '60px', width: '50rem', borderRadius: '20px', backgroundColor: 'white', color: 'black' }}
          className="input-home-page"
          placeholder="Search for events in your city"
          value={city}
          name='city'
          onChange={(e) => setCity(e.target.value)} />
        <button
          type='submit'
          style={{ borderRadius: '20px', marginLeft: '20px', width: '10rem', height: '60px' }}
          className='button-lookup'
        >Lookup
        </button>
      </form>
    </div >
  );
}

