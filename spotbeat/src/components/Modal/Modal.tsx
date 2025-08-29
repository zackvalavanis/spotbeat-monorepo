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
      <section className="information-section">
        {[
          { title: 'Fast Alerts', desc: 'Get notified instantly when tickets go on sale.' },
          { title: 'Secure Checkout', desc: 'Buy safely without missing your favorite shows.' },
          { title: 'Track Events', desc: 'Follow artists and venues to never miss a beat.' }
        ].map((feature) => (
          <div key={feature.title} className="">
            <h3 className="">{feature.title}</h3>
            <p className="">{feature.desc}</p>
          </div>
        ))}
        <button className="modal-close-button" onClick={onClose}>×</button>
        <h1>{location}</h1>
      </section>
    </div>
  );
};