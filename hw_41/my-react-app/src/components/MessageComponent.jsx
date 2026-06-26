import { useState, use, Suspense} from 'react';

const miniFetch = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Sucess!");
        }, 2000);
    });
};

const DataComponent = ({ dataPromise }) => {
    const message = use(dataPromise);
    return <h3>{message}</h3>;
};

function MessageComponent () {
    const [dataPromise] = useState(() => miniFetch());

    return (
        <Suspense fallback={<p>Data is loading...</p>}>
            <DataComponent dataPromise={dataPromise}/>
        </Suspense>
    );
}

export default MessageComponent;