// src/components/Location/useLocationCity.ts
import { useState, useEffect } from 'react';

export function useLocationCity() {
  const [city, setCity] = useState<string>(''); // default empty
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
          .then(res => res.json())
          .then(data => {
            if (data.address?.city) setCity(data.address.city);
            else if (data.address?.town) setCity(data.address.town);
            else if (data.address?.village) setCity(data.address.village);
            else setError('City not found');
          })
          .catch(() => setError('Failed to fetch location data'));
      },
      () => setError('Geolocation permission denied or unavailable')
    );
  }, []);

  return city;
}
