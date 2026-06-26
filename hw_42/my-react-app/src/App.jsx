import { useState } from 'react'
import './App.css'
import DataFetcher from './components/DataFetcher'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <DataFetcher/>
      </section>
    </>
  )
}

export default App
