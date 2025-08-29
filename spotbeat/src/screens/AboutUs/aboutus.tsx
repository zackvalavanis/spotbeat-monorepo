import './aboutus.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient'
import type { User } from '@supabase/supabase-js';

export function AboutUs() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50); // trigger fade-in shortly after mount
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
      console.log('Logged-in user:', data.user);
    };
    fetchUser();
  }, []);

  return (
    <div className={`about-us-page ${visible ? 'visible' : ''}`}>
      <section className='top-about-us-section'>
        {user && <p>Logged in: {user.email}</p>}
        <h2>
          Never Miss a Concert Again
        </h2>
        <p>
          SpotBeat finds tickets before they sell out and notifies you instantly. Your front-row experience starts here.
        </p>

        <button
          onClick={() => {
            navigate(user ? '/home' : '/login')
          }}
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