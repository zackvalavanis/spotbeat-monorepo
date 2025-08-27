import './Login.css'


export function Login() {
  return (
    <div className='login-page'>
      <form>

        <div>
          <label>Name:</label>
          <input name='name' type="text"></input>
        </div>

        <div>
          <label>Email:</label>
          <input name='email' type="email" ></input>
        </div>

        <div>
          <label>Password:</label>
          <input name='password' type="password"></input>
        </div>

        <div>
          <label>Password Confirmation:</label>
          <input name='password-confirmation' type="password"></input>
        </div>

        <div>
          <h1>Google Auth</h1>
        </div>

        <div>
          <h1>Apple Auth</h1>
        </div>
      </form>
    </div>
  )
}