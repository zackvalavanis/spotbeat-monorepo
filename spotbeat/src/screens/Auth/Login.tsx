import './Login.css'
import { useState } from 'react'
import { supabase } from '../../supabaseClient'
import { useNavigate } from 'react-router-dom'



export function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')


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

      console.log('User logged in:', userData.user)
      navigate('/')
    } catch (err) {
      setLoading(false)
      setErrorMessage('Something went wrong')
      console.error(err)
      console.log(errorMessage)
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

        <div>
          <button
            type='submit'
          >Login
          </button>
        </div>
      </form>

      <div>
        <div>
          <h1>Google Auth</h1>
        </div>

        <div>
          <h1>Apple Auth</h1>
        </div>
      </div>
    </div>
  )
}