import React from 'react';
import DeepChildComponent from './DeepChildComponent';

function ChildComponent() {
  return (
    <div style={{ border: '1px solid #999', padding: '10px', marginTop: '10px' }}>
      <h4>Проміжний компонент</h4>
      <DeepChildComponent />
    </div>
  );
}

export default ChildComponent;