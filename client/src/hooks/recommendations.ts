import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

import { ApiResponse, Recommendation } from '../data';

export const useRecommendation = (
  location: string
): ApiResponse<Recommendation[]> => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const createRecommendation = async () => {
      setLoading(true);
      try {
        const promise = await axios.post<
          { location: string },
          Promise<AxiosResponse<Recommendation[]>>
        >('/recommendations/spot', { location });
        const response = await promise.data;

        setRecommendations(response);
      } catch (error) {
        setErrors(error);
      } finally {
        setLoading(false);
      }
    };

    createRecommendation();
  }, [location]);

  return { data: recommendations, errors, loading };
};
