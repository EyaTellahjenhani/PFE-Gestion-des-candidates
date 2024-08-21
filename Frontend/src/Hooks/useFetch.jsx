import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

function useFetchData(fetchFunction) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isSuccess, setSuccess] = useState("");
  const [error, setError] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const {data} = await fetchFunction()
        setData(data);

      } catch (error) {
        if (error.response.status === 401) {
          logout();
        }
    
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

  }, []);



  return { data, isLoading, isSuccess, error, setData  };
}

export default function useFetch(fetchFunction) {
  const { data, isLoading, isSuccess, error,setData } = useFetchData(fetchFunction);

  return { data, isLoading, isSuccess, error,setData };
}