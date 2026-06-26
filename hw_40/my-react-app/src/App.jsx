import { useState } from 'react'
import './App.css'
import ControlledForm from './components/ControlledForm.jsx'
import UncontrolledForm from './components/UncontrolledForm.jsx'
import DataFetcher from './components/DataFetcher.jsx'

function App() {

  return (
    <>
      <section id="center">
        <ControlledForm/>
        <UncontrolledForm/>
        <DataFetcher/>
      </section>
    </>
  )
}

export default App
