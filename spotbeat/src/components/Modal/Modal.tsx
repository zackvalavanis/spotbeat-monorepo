import './Modal.css';
import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useCity } from '../Context/use-city';

interface ModalProps {
  show: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
  const { city, setCity } = useCity();
  const [selectedCity, setSelectedCity] = useState(city);

  // reset input when modal opens
  useEffect(() => {
    if (show) setSelectedCity(city);
  }, [show, city]);

  if (!show) return null;

  const handleSave = () => {
    setCity(selectedCity); // update global city
    onClose?.();
  };

  return (
    <div className="modal-backdrop">
      <section className="information-section">
        {[
          { title: 'Fast Alerts', desc: 'Get notified instantly when tickets go on sale.' },
          { title: 'Secure Checkout', desc: 'Buy safely without missing your favorite shows.' },
          { title: 'Track Events', desc: 'Follow artists and venues to never miss a beat.' }
        ].map((feature) => (
          <div key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}

        <div className='right-location-section'>
          <input
            type="text"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            placeholder="Enter your city"
            className="location-input"
          />
          <button
            onClick={handleSave}
            style={{ marginTop: '10px', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
          >
            Save
          </button>
        </div>

        <button className="modal-close-button" onClick={onClose}>×</button>
      </section>
    </div>
  );
};
