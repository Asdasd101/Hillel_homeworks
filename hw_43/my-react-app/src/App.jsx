import { BrowserRouter, Routes, Route, NavLink } from 'react-router';

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Головна</NavLink>
        <NavLink to="/about">Про нас</NavLink>
        <NavLink to="/contact">Контакти</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;