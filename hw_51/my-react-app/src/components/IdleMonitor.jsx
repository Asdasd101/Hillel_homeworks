import React from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { toast } from 'react-toastify';

export default function IdleMonitor() {
  const onIdle = () => {
    toast.warn('Сесію призупинено через бездіяльність', {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const onActive = () => {
    toast.success('З поверненням до роботи!', {
      position: "top-right",
      autoClose: 2000,
    });
  };

  useIdleTimer({
    timeout: 5000,
    onIdle,
    onActive,
    debounce: 500
  });

  return null;
}