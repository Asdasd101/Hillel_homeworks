import { useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/counterSlice';

const CounterButtons = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
};

export default CounterButtons;