import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import LandingPage from './screens/home'

function App() {

  const router = createBrowserRouter([
    {
      element: (
        <div>
          <Outlet />
        </div>
      ),
      children: [
        {
          path: '/',
          element: <LandingPage />
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
