import './Modal.css'
import React from 'react';

interface ModalProps {
  show: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
  const location = 'Chicago'
  if (!show) return null; // don't render if not shown


  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>×</button>
        <h2>Location: {location}</h2>
      </div>
    </div>
  );
};