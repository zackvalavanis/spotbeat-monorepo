
import { useState } from "react"

export default function LandingPage() {
  const [city, setCity] = useState<string>('')

  const handleIndex = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8000/api/getEvents?city=${encodeURIComponent(city)}`)
      const songs = await res.json()
      console.log(songs)
    } catch (error) {
      console.error(error)
    }
  }

  // useEffect(() => {
  //   handleIndex()
  // }, [])


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header / Logo */}

      <header className="w-full flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">SpotBeat</h1>
        <nav>
          <ul className="flex space-x-4">
            <li className="text-gray-700 font-semibold">Home</li>
            <li className="text-gray-700 font-semibold">Features</li>
            <li className="text-gray-700 font-semibold">Sign Up</li>
          </ul>
        </nav>
        <form onSubmit={handleIndex}>
          <input
            value={city}
            name='city'
            onChange={(e) => setCity(e.target.value)} />

          <button type='submit'>Lookup</button>
        </form>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-16 px-6">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          Never Miss a Concert Again
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl max-w-xl mb-8">
          SpotBeat finds tickets before they sell out and notifies you instantly. Your front-row experience starts here.
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 px-6 text-center">
        {[
          { title: 'Fast Alerts', desc: 'Get notified instantly when tickets go on sale.' },
          { title: 'Secure Checkout', desc: 'Buy safely without missing your favorite shows.' },
          { title: 'Track Events', desc: 'Follow artists and venues to never miss a beat.' }
        ].map((feature) => (
          <div key={feature.title} className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>


      {/* Footer */}
      <footer className="w-full bg-white mt-24 p-6 text-center text-gray-500">
        © 2025 SpotBeat. All rights reserved.
      </footer>
    </div>
  );
}

