import './aboutus.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

export function AboutUs() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50); // trigger fade-in shortly after mount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`about-us-page ${visible ? 'visible' : ''}`}>
      <section className='top-about-us-section'>
        <h2>
          Never Miss a Concert Again
        </h2>
        <p>
          SpotBeat finds tickets before they sell out and notifies you instantly. Your front-row experience starts here.
        </p>
        <button
          onClick={() => navigate('/home')}
        >
          Get Started
        </button>
      </section>

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
      </section>
    </div>
  )
}