import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import './show-event.css';
import type { User } from '@supabase/supabase-js';
import { supabase } from "../../supabaseClient";

export function EventsShow() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [event, setEvent] = useState<any>(location.state?.event || null);
  const [liked, setLiked] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Fetch event if not passed via state
  useEffect(() => {
    if (!event && id) {
      fetch(`http://localhost:8000/api/events/${id}`)
        .then(res => res.json())
        .then(data => setEvent(data))
        .catch(console.error);
    }
  }, [id, event]);

  // Get logged-in user from Supabase
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
      console.log('Logged-in user:', data.user);
    };
    fetchUser();
  }, []);

  if (!event) return <p>Loading...</p>;

  const handleLike = async () => {
    if (!user) {
      alert("Please log in to like this event");
      return;
    }

    setLoadingLike(true);

    try {
      const res = await fetch(`http://localhost:8000/api/events/${id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }) // UUID string
      });

      if (!res.ok) throw new Error("Failed to like event");

      const data = await res.json();
      console.log("Like response:", data);
      setLiked(true);
      alert("Event liked!");
    } catch (err) {
      console.error(err);
      alert("Failed to like event");
    } finally {
      setLoadingLike(false);
    }
  };

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

      <button onClick={handleLike} disabled={liked || loadingLike}>
        {liked ? "RSVPed" : loadingLike ? "Liking..." : "RSVP"}
      </button>
    </div>
  );
}
