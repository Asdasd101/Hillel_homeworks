import { useState, useEffect } from "react";

function DataFetcher () {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect (() => {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then((response) => {
            if (!response.ok) throw new Error();
            return response.json();
        })
        .then((data) => {
            setPost(data);
            setLoading(false);
        })
        .catch(() => {
            setError(true);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Завантаження...</p>
    if (error) return <p>Сталася помилка!</p>

    return (
        <div>
            <h3>Дані з сервера</h3>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
        </div>
    );
}

export default DataFetcher;