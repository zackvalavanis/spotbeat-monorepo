export function Logout() {

  const handleLogout = () => {
    localStorage.removeItem('jwt')
  }


  return (
    <h1>
      <button onClick={handleLogout}>Logout</button>
    </h1>
  )
}