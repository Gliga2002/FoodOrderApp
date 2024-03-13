import { useCallback, useEffect, useState } from 'react';
import { sendHttpRequest } from '../util/http';

export default function useHttp(url, config, initialData) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(false);

  function initData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, {
          ...config,
          body: JSON.stringify(data),
        });
        setData(resData);
      } catch (error) {
        console.log('ovde');
        setError(error.message || 'Something went wrong');
      }
      setIsLoading(false);
    },
    [url, config]
  );

  // proveri ako ima config, da li je GET methoda ili da nema nista !!
  // ako nema config opet je okej, jer hocu default GET method !!
  useEffect(() => {
    console.log('Custom hook useEffect');
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    initData,
  };
}
