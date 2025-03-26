import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useFetch = (url, method = 'GET') => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const apiData = (formData) => {
    setOptions(formData);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (Api, payload) => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await Api(url, payload, {
          signal: controller.signal,
        });
        if (data) {
          setData(data);
        }
        setIsLoading(false);
        setError(null);
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    };

    if (method === 'GET') {
      fetchData(api.get);
    }
    if (method === 'POST' && options) {
      fetchData(api.post, options);
    }
    if (method === 'PATCH' && options) {
      fetchData(api.patch, options);
    }
    if (method === 'DELETE') {
      fetchData(api.delete);
    }
    return () => {
      controller.abort();
    };
  }, [url, method, options]);

  return { data, isLoading, error, apiData };
};
