import { useCallback, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useSearchParams } from 'react-router-dom';

function useFetchData(fetchFunction) {
  const [data, setData] = useState([] || {});
  const [isLoading, setLoading] = useState(true);
  const [isSuccess, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const [searchParams] = useSearchParams();



  const fetchData = useCallback(async () => {
    try {
      const {data} = await fetchFunction()
      setData(data);
      setError("");

    } catch (error) {
      setLoading(false)
      if (error.response.status === 401) {
        logout();
      }
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  
}, [fetchFunction, logout,searchParams ]);


  useEffect(() => {
   
    fetchData();
  }, [isLoading]);

  return { data, isLoading, isSuccess, error, setData , refresh:fetchData,searchParams };
}

export default function useFetch(fetchFunction) {
  return useFetchData(fetchFunction);

}