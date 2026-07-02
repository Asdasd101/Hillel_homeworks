import { useState } from 'react'
import './App.css'
import { AppProvider } from './context/AppContext';
import ParentComponent from './components/ParentComponent';

function App() {

  return (
    <>
      <AppProvider>
        <section id="center">
          <h1>React Context</h1>
          <ParentComponent />
        </section>
      </AppProvider>
      </>
  );
}

export default App;
