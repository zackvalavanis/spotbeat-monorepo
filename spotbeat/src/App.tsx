import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Header } from './screens/Header/Header';  // Header.tsx
import { Footer } from './screens/Footer/footer';   // footer.tsx
import { AboutUs } from './screens/AboutUs/aboutus'; // aboutus.tsx
import Home from './screens/Home/home';            // home.tsx
import { LandingPage } from './screens/LandingPage/landing-page'; // landing-page.tsx
import { SignUp } from './screens/Auth/Sign-up';   // Sign-up.tsx
import { Login } from './screens/Auth/Login';      // Login.tsx


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
