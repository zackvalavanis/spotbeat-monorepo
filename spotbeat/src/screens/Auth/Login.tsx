import './Login.css'
import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { useNavigate } from 'react-router-dom'
import type { User } from '@supabase/supabase-js';


export function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState<User | null>(null)


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    const form = e.currentTarget;
    const formData = new FormData(form)
    const formValues = Object.fromEntries(formData.entries()) as {
      email: string
      password: string
    }

    try {
      const { data: userData, error } = await supabase.auth.signInWithPassword({
        email: formValues.email,
        password: formValues.password
      })
      console.log(loading)

      setLoading(false)

      if (error) {
        setErrorMessage(error.message)
        return
      }

      if (userData?.user) {
        setUser(userData?.user);
      } else {
        setErrorMessage('No user returned');
      }
      navigate('/')
    } catch (err) {
      setLoading(false)
      setErrorMessage('Something went wrong')
      console.error(err)
      console.log(errorMessage)
    }
  }

  useEffect(() => {
    console.log('Updated user:', user);
    console.log('userId', localStorage.getItem('userId'))
  }, [user]);

  const handleGoogleAuth = async () => {
    setLoading(true)
    setErrorMessage('')

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      },
    });
    alert('Redirecting to Google for authentication...')

    setLoading(false)
    if (error) {
      setErrorMessage(error.message)
      return
    }
  }


  return (
    <div className='login-page'>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input name='email' type="email" ></input>
        </div>

        <div>
          <label>Password:</label>
          <input name='password' type="password"></input>
        </div>

        <div className='button-container'>
          <button
            className='login-button'
            type='submit'
          >Login
          </button>
        </div>
      </form>

      <div>
        <h1 style={{ fontSize: '20px', margin: '40px' }}>Other ways to sign in</h1>
      </div>

      <img
        onClick={handleGoogleAuth}
        src="/web_dark_rd_SI@3x.png"
        alt="Google logo"
        className="google-logo"
      />
    </div>
  )
}