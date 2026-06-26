import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        setData(response.data);
      } catch (err) {
        setError('Помилка завантаження');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Завантаження даних...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <p><strong>Заголовок:</strong> {data.title}</p>
      <p><strong>Статус:</strong> {data.completed ? 'Виконано' : 'В процесі'}</p>
    </div>
  );
}

export default DataFetcher;