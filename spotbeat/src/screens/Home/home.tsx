import { useState, useEffect } from "react";
import './home.css';
import { useNavigate } from "react-router-dom";
import { useLocationCity } from "../../components/Location/location";

export default function Home() {
  const locationCity = useLocationCity();
  const navigate = useNavigate();

  // Combined search input
  const [searchText, setSearchText] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();


    const params: Record<string, string> = {};

    // If user entered text, use it; otherwise fallback to locationCity
    if (searchText) params.city = searchText;
    else if (locationCity) params.city = locationCity;

    if (startDate) params.startDateTime = startDate;
    if (endDate) params.endDateTime = endDate;

    const queryString = new URLSearchParams(params).toString();

    try {
      const res = await fetch(`http://localhost:8000/api/events?${queryString}`);
      if (!res.ok) throw new Error('Failed to fetch events');
      const events = await res.json();
      navigate('/events', { state: { events, city: params.city || '', filters: params } });
      console.log(res)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`home-page-container ${visible ? 'show' : ''}`}>
      <form onSubmit={handleSearch} className="search-form">
        <input
          className="input-home-page"
          placeholder={locationCity ? `Search in ${locationCity}` : `Search for events`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button type="submit" className="button-lookup">Lookup</button>
      </form>
    </div>
  );
}
