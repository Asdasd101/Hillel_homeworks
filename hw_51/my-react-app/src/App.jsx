import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';

import IdleMonitor from './components/IdleMonitor';
import DashboardChart from './components/DashboardChart';

export default function App() {
  
  const handleStartSession = () => {
    toast.info('Сесію тренування розпочато! 🥁', {
      position: "bottom-center"
    });
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <IdleMonitor />

      <h2>
        <FaMusic style={{ marginRight: '10px', color: '#8884d8' }} /> 
        Session Dashboard
      </h2>
      <p style={{ color: '#666' }}>Зачекайте 5 секунд, щоб перевірити Idle Timer.</p>

      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <button onClick={handleStartSession} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          <FaPlay style={{ marginRight: '5px' }} /> Старт
        </button>
        <button onClick={() => toast.error('Сесію зупинено.')} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          <FaPause style={{ marginRight: '5px' }} /> Пауза
        </button>
      </div>

      <hr />

      <DashboardChart />

      <ToastContainer />
    </div>
  );
}