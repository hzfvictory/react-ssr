import {useEffect, useState} from "react"

const fetchTimeout = (url, init, timeout = 30000) => {
  return Promise.race(
    [
      fetch(url, init),
      new Promise(resolve => setTimeout(() => resolve('超时'), timeout))
    ]
  ).then(response => response.json());
};

const useFetch = (initialUrl, initialData = {data: []}) => {

  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await fetchTimeout(url, {
          method: 'GET',
          credentials: 'same-origin'
        });
        setData(result);
      } catch (error) {
        setIsError(true);
        setData(initialData);
      }
      setIsLoading(false);
    };

    fetchData();

  }, [url]);

  return [{data, isLoading, isError}, setUrl];
};

export default useFetch