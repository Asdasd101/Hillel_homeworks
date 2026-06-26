import { useRef } from 'react';

function UncontrolledForm () {
    const myInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Текст із неконтрольованої форми:' + myInputRef.current.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Uncontrolled</h3>
            <input type="text" ref={myInputRef}/>
            <button type="submit">Send</button>
        </form>
    );
}

export default UncontrolledForm;