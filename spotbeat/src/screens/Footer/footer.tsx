import './footer.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import type { User } from '@supabase/supabase-js';

export function Footer() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null);
  // const location = useLocation();


  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
      console.log('Logged-in user:', data.user);
    };
    fetchUser();
  }, []);

  return (
    <div className='footer-container'>
      <footer className="w-full bg-white mt-24 p-6 text-center text-gray-500">
        <p>© 2025 SpotBeat. All rights reserved.</p>

        <div className='login-logout-container-footer mt-4'>
          {user ? (
            <span
              className='sign-up-button cursor-pointer'
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
                if (!error) navigate('/login');
              }}
            >
              Logout
            </span>
          ) : (
            <>
              <span
                className='sign-up-button cursor-pointer'
                onClick={() => navigate('/login')}
              >
                Login
              </span>
              <span
                className='sign-up-button cursor-pointer'
                onClick={() => navigate('/sign-up')}
              >
                Sign Up
              </span>
            </>
          )}
        </div>

        <div className='about-us-button-container mt-4'>
          { }
          <span
            className='sign-up-button cursor-pointer'
            onClick={() => navigate('/aboutus')}
          >
            About Us
          </span>
        </div>
      </footer>
    </div>
  )
}