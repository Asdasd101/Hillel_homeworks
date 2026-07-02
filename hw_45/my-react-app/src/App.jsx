import { useState } from 'react';
import CounterDisplay from './components/CounterDisplay';
import CounterButtons from './components/CounterButtons';
import './App.css';

function App() {
  return (
    <>
      <section id="center">
        <CounterDisplay/>
        <CounterButtons/>
      </section>
    </>
  )
}

export default App
