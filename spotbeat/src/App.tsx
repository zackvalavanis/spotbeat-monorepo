import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Header } from './screens/Header/Header'
import { Footer } from './screens/Footer/footer'
import { AboutUs } from './screens/AboutUs/aboutus'
import Home from './screens/Home/home';
import { LandingPage } from './screens/LandingPage/landing-page'
import { SignUp } from './screens/Auth/Sign-up'
import { Login } from './screens/Auth/Login'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },

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
          path: '/home',
          element: <Home />
        },
        {
          path: '/aboutus',
          element: <AboutUs />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/sign-up',
          element: <SignUp />
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
