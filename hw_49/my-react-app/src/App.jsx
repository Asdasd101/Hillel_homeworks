import { useState } from 'react'
import './App.css'
import UserProfile from './components/UserProfile.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <UserProfile />
      </section>
    </>
  )
}

export default App
