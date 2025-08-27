import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import LandingPage from './screens/Home/home'
import { Header } from './screens/Header/Header'
import { Footer } from './screens/Footer/footer'
import { AboutUs } from './screens/AboutUs/aboutus'

function App() {

  const router = createBrowserRouter([
    {
      element: (
        <div>
          <Header />
          <Outlet />
          <Footer />
        </div>
      ),
      children: [
        {
          path: '/',
          element: <LandingPage />
        },
        {
          path: '/aboutus',
          element: <AboutUs />
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
