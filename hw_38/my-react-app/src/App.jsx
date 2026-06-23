import { useState } from 'react'
import Button from './Button.jsx';
import './App.css'

function App() {
  const handleClick = () => {
    console.log("The button was pressed");
  }

  return (
    <div id="center">
      <Button text="Send" type="submit" onClick={handleClick}/>
    </div>
  )
}

export default App
