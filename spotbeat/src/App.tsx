import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import LandingPage from './screens/Home/home'
import { Header } from './screens/Header/Header'

function App() {

  const router = createBrowserRouter([
    {
      element: (
        <div>
          <Header />
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
