import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url) => {
    const [data, setData] = useState();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const axiosInstance = axios.create();

    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        (err) => {
            if (err.response) {
                if (err.response.status === 400 && !err.config._retry) {
                    return axiosInstance.get(err.config.url, { ...err.config, _retry: true });
                }
            }

            return Promise.reject(err);
        }
    );

    useEffect(() => {
        const controller = new AbortController();

        const asyncAxios = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(url, { signal: controller.signal });
                setLoading(false);
                setData(response.data);
            } catch (error) {
                console.log({...error})
                setLoading(false);
                setError(`${error.response.status} ${error.response.statusText}`);
            }
        }

        if (url !== '') {
            asyncAxios();
        }

        return () => controller.abort();
    }, [url])

    return { data, error, loading };
}

export default useAxios;
