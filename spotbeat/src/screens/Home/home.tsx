import { useState, useEffect } from "react";
import './home.css';
import { useNavigate } from "react-router-dom";
import { useLocationCity } from "../../components/Location/location";

export default function Home() {
  const [city, setCity] = useState<string>('');
  const [visible, setVisible] = useState(false); // for fade-in
  const navigate = useNavigate();
  const locationCity = useLocationCity(); // rename to avoid confusion

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleIndex = async (e: React.FormEvent) => {
    e.preventDefault();

    const queryCity = city || locationCity; // fallback to locationCity if city input is empty

    if (!queryCity) {
      console.warn("No city provided");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/events?city=${encodeURIComponent(queryCity)}`);
      const events = await res.json();
      console.log(events);
      navigate('/events', { state: { events, city: queryCity } });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`home-page-container ${visible ? 'show' : ''}`}>
      <form onSubmit={handleIndex}>
        <input
          className="input-home-page"
          style={{ height: '60px', width: '50rem', borderRadius: '20px', backgroundColor: 'white', color: 'black' }}
          placeholder={locationCity ? `Search for events in ${locationCity}` : `Search for events in your city`}
          value={city}
          name='city'
          onChange={(e) => setCity(e.target.value)}
        />
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
