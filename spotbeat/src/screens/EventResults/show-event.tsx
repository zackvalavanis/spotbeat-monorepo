import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import './show-event.css'

export function EventsShow() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [event, setEvent] = useState<any>(location.state?.event || null);

  useEffect(() => {
    // Only fetch if we don’t already have the event passed from state
    if (!event && id) {
      fetch(`http://localhost:8000/api/events/${id}`)
        .then(res => res.json())
        .then(data => setEvent(data))
        .catch(console.error);
    }
  }, [id, event]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className='event-show-page'>
      <h1>{event.name}</h1>
      {event.images?.length && event.images[0].url ? (
        <img
          style={{ height: '300px', width: '300px', objectFit: 'cover', borderRadius: '8px' }}
          src={event.images[0].url}
          alt={event.name}
        />
      ) : (
        <div
          style={{
            height: '300px',
            width: '300px',
            backgroundColor: '#eee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
          }}
        >
          No Image
        </div>
      )}
      <p>{event.dates?.start?.localDate}</p>
      <p>{event._embedded?.venues?.[0]?.name}</p>
    </div>
  );
}
