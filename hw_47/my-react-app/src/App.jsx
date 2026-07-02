import { useState } from 'react'
import './App.css'
import SimpleForm from './components/Form.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <SimpleForm/>
      </section>
    </>
  )
}

export default App
