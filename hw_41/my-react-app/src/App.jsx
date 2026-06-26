import { useState } from 'react'
import './App.css'
import MessageComponent from './components/MessageComponent.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <MessageComponent/>
      </section>
    </>
  )
}

export default App
