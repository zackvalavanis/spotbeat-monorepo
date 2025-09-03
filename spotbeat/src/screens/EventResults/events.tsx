import './events.css'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface EventImage {
  url: string | null
}

interface EventDate {
  start: {
    localDate: string
  }
}

interface Event {
  id: string
  name: string
  images?: EventImage[]
  dates?: EventDate
}

const ITEMS_PER_PAGE = 9 // 3 per row × 3 rows

export function Events() {
  const location = useLocation()
  const { city: initialCity, events: initialEvents } =
    (location.state as { city: string; events: Event[] }) || {
      city: '',
      events: [],
    }

  const [visible, setVisible] = useState(false)
  const [page, setPage] = useState(1)
  const [city, setCity] = useState<string>(initialCity)
  const [eventsList, setEventsList] = useState<Event[]>(initialEvents)

  // fade-in animation
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150)
    return () => clearTimeout(timer)
  }, [])

  // pagination
  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const selectedEvents = eventsList.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  const totalPages = Math.ceil(eventsList.length / ITEMS_PER_PAGE)

  // search form handler
  const handleIndex = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(
        `http://localhost:8000/api/getEvents?city=${encodeURIComponent(city)}`
      )
      const data = await res.json()
      setEventsList(data)
      setPage(1) // reset pagination
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={`events-page ${visible ? 'show' : ''}`}>
      {/* Search Form */}
      <form onSubmit={handleIndex} style={{ marginBottom: '30px' }}>
        <input
          className="input-home-page"
          style={{
            height: '60px',
            width: '50rem',
            borderRadius: '20px',
            backgroundColor: 'white',
            color: 'black',
          }}
          placeholder="Search for events in your city"
          value={city}
          name="city"
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          className="button-lookup"
          style={{
            borderRadius: '20px',
            marginLeft: '20px',
            width: '10rem',
            height: '60px',
          }}
        >
          Lookup
        </button>
      </form>

      {/* Header */}
      <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Events near {city}</h2>

      {/* Grid */}
      <div className="events-grid">
        {selectedEvents.length > 0 ? (
          selectedEvents.map((event) => (
            <div className="event-items" key={event.id}>
              {/* Image */}
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

              {/* Event Info */}
              <div>
                <h1
                  style={{
                    fontSize: '14px',
                    marginTop: '10px',
                    textAlign: 'center',
                    fontWeight: 500,
                  }}
                >
                  {event.name}
                </h1>
                <h2
                  style={{
                    fontSize: '12px',
                    marginTop: '5px',
                    textAlign: 'center',
                    color: '#555',
                  }}
                >
                  {event.dates?.start.localDate || 'No Date'}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>

      {/* Pagination Controls */}
      {eventsList.length > ITEMS_PER_PAGE && (
        <div
          style={{
            marginTop: '30px',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
