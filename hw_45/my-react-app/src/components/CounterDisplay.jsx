import { useSelector } from 'react-redux';

const CounterDisplay = () => {
  const count = useSelector((state) => state.counter.value);

  return <h1>Поточний рахунок: {count}</h1>;
};

export default CounterDisplay;