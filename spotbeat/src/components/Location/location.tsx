// src/components/Location/useLocationCity.ts
import { useEffect } from 'react';
import { useCity } from '../Context/use-city';

export function useLocationCity() {
  const { city, setCity } = useCity();

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
          .then(res => res.json())
          .then(data => {
            const newCity =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              'Chicago';
            setCity(newCity); // update global city
          })
          .catch(() => setCity('Chicago'));
      },
      () => setCity('Chicago') // fallback if permission denied
    );
  }, [setCity]);

  return city; // returns the global city
}
