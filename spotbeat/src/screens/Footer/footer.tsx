import './footer.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
              <h1>Logout</h1>
              <h1>Sign Up</h1>
            </div>
          ) : (
            <div className='login-logout-container-footer'>
              <h1>Login</h1>
            </div>
          )
          }
          <div className='about-us-button-container'>
            <button
              className='about-us-button'
              onClick={() => navigate('/aboutus')}
            >About us
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}