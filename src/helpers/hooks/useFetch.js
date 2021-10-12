import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const asyncFect = async () => {
            try {
                setLoading(true);
                const response = await fetch(url, { signal: controller.signal });
                const json = await response.json();

                setLoading(false);

                setData(json);

                // setHeadingText(`Showing ${pageNumber * 20} out of 500 results for ${query}`);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setLoading(false);
                    setError(error);
                }
            }
        }

        if (url !== '') {
            asyncFect();
        }

        return () => controller.abort();
    }, [url])

    return { data, error, loading };
}

export default useFetch;
