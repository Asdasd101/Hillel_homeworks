import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function DeepChildComponent() {
  const { theme, toggleTheme } = useContext(AppContext);

  const styles = {
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    padding: '15px',
    marginTop: '10px',
    border: '1px solid'
  };

  return (
    <div style={styles}>
      <h5>Глибокий компонент</h5>
      <p>Поточна тема додатка: <strong>{theme}</strong></p>
      <button onClick={toggleTheme}>Змінити тему</button>
    </div>
  );
}

export default DeepChildComponent;