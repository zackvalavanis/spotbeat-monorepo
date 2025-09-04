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
      <div className='information-section-modal'>
        <h1
          style={{ marginBottom: '20px', fontSize: '24px' }}
        >
          Set your location
        </h1>
        <button className="modal-close-button-modal" onClick={onClose}>×</button>
        <input
          type="text"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          placeholder="Enter your city"
          className="location-input"
        />
        <button
          onClick={handleSave}
          className='button-save-location'
        >
          Save
        </button>
      </div>
    </div>
  );
};
