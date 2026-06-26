import { useState } from 'react';

function ControlledForm () {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Текст із контрольованої форми:' + text);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Controlled</h3>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
            <button type="submit">Send</button>
        </form>
    )
}

export default ControlledForm;