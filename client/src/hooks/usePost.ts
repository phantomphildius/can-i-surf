import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

import { ApiResponse } from '../data';

type PostBody = Record<string, string | number | boolean>;

export function usePost<Body = PostBody, Response = {}>(
  url: string,
  body: PostBody
): ApiResponse<Response> {
  const [data, setData] = useState<Response>();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const createPost = async () => {
      setLoading(true);

      try {
        const response = await axios.post<
          Body,
          Promise<AxiosResponse<Response>>
        >(url, body, { cancelToken: source.token });

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
    createPost();

    return () => {
      source.cancel();
    };
  }, [url, ...Object.values(body)]);

  return { data, loading, errors };
}
