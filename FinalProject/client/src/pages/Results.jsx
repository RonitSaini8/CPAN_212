import { useEffect, useState } from 'react';

export default function Results({ query }) {
    const [results, setResults] = useState([]);

    useEffect => (() => {
        if (query) {
            const fetchResults = async () => {
                const response = await fetch(`http://localhost:5173/search?q=${query}`)
                const data = await response.json();
                setResults(data);
            };
            fetchResults();
        }
    }, [query]);

    return (
        <div>
           <h1>Results</h1> 
           {results.length === 0 ? (
            <p>No results found !!</p>
           ) : (
            <ul>
                {results.map((item, index) => (
                    <li key = {index}>{item.name}</li>
                ))}
            </ul>
           )}
        </div>
    );
};