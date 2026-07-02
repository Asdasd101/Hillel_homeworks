import React from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
      <h3>Рівень 1: Батьківський компонент</h3>
      <ChildComponent />
    </div>
  );
}

export default ParentComponent;