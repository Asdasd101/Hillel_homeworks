import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './dataSlice';

const DataList = () => {
  const dispatch = useDispatch();
  
  const { items, isLoading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (isLoading) return <h3>Завантаження даних...</h3>;

  if (error) return <h3 style={{ color: 'red' }}>Помилка: {error}</h3>;

  return (
    <div>
      <h2>Список елементів:</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            <strong>{item.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;