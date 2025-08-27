import './footer.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logout } from '../Auth/Logout'

export function Footer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    console.log(jwt)
    if (jwt) {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <div className='footer-container'>
      <footer className="w-full bg-white mt-24 p-6 text-center text-gray-500">
        © 2025 SpotBeat. All rights reserved.
        <div>
          {isLoggedIn ? (
            <div className='login-logout-container-footer'>
              <Logout />
            </div>
          ) : (
            <div className='login-logout-container-footer'>
              <span className='sign-up-button' onClick={() => navigate('/login')}>Login</span>
              <span
                className='sign-up-button'
                onClick={() => navigate('/sign-up')}
              >
                Sign Up
              </span>
            </div>
          )
          }
          <div className='about-us-button-container'>
            <span className='sign-up-button' onClick={() => navigate('/aboutus')}>About Us</span>
          </div>
        </div>
      </footer>
    </div>
  )
}