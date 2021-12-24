import { useState, useEffect } from 'react';
import axios from 'axios';

import { ApiResponse } from '../data';

export function useFetch<Response = {}>(url: string): ApiResponse<Response> {
  const [data, setData] = useState<Response>();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getFetch = async () => {
      setLoading(true);

      try {
        const response = await axios.get<Response>(url, {
          cancelToken: source.token,
        });

        setData(response.data);
      } catch (error: any) {
        if (!axios.isCancel(error)) {
          if (error.response) {
            setErrors(error.response.data);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    getFetch();

    return () => {
      source.cancel();
    };
  }, [url]);

  return { data, loading, errors };
}
