import { useState } from 'react'
import './App.css'
import DataList from './features/data/DataList';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <DataList />
      </section>
    </>
  )
}

export default App
