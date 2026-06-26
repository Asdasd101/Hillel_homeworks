import { useState } from 'react'
import CounterDisplay from './StatelessComponent';

export default function Button() {
    const [count, setCount] = useState(0);

    function increment () {
        setCount(count + 1);
    }
    return (
        <>
            <CounterDisplay value={count} />
            <button onClick={increment}>
                Increment
            </button>
        </>
    );
}