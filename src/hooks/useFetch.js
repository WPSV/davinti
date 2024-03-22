import { useCallback, useState } from 'react';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setError(null);
      setSuccess(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      if (response.ok === false) throw new Error(json.message);
    } catch (error) {
      json = null;
      setError(error.message);
    } finally {
      if (json && json.result !== null && json.message !== null) {
        setData(json.result);
        setSuccess(json.message);
      }
      setLoading(false);
      return { response, json };
    }
  }, []);

  return {
    data,
    loading,
    error,
    setError,
    success,
    request,
  };
};

export default useFetch;
