import React, { useState, useMemo, useCallback } from 'react';

const MemoizedButton = React.memo(({ onClick, label }) => {
  console.log(`[Рендер кнопки]: ${label}`);
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
});

MemoizedButton.displayName = 'MemoizedButton';

export default function App() {
  const [number, setNumber] = useState(25);
  const [toggle, setToggle] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const expensiveCalculation = (num) => {
    console.log('⚡ Обчислення...');
    for (let i = 0; i < 1000000000; i++) {} 
    return num * 2;
  };

  const memoizedResult = useMemo(() => {
    return expensiveCalculation(number);
  }, [number]);

  const incrementCounter = useCallback(() => {
    setClickCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <h2>Демонстрація мемоізації</h2>
      
      <section>
        <h3>useMemo</h3>
        <p>Число: {number}</p>
        <p>Результат: {memoizedResult}</p>
        <button onClick={() => setNumber(prev => prev + 1)}>
          +1 до числа
        </button>
      </section>

      <section>
        <h3>useCallback + React.memo</h3>
        <p>Кліків: {clickCount}</p>
        <MemoizedButton 
          onClick={incrementCounter} 
          label="Кнопка-лічильник" 
        />
      </section>

      <section>
        <h3>Тригер рендерингу</h3>
        <p>Стан перемикача: {toggle ? "ON" : "OFF"}</p>
        <button onClick={() => setToggle(prev => !prev)}>
          Перемикнути стан
        </button>
      </section>
    </div>
  );
}