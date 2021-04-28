import { useState, useEffect } from 'react';
import axios from 'axios';

import { ApiResponse, Forecast } from '../data';

export const useForecast = (spotId: number): ApiResponse<Forecast[]> => {
  const [forecast, setForecast] = useState<Forecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const getForecast = async () => {
      setLoading(true);
      try {
        const promise = await axios.get<Promise<Forecast[]>>(
          `/magic_seaweed/forecasts/${spotId}`
        );
        const response = await promise.data;

        setForecast(response);
      } catch (error) {
        setErrors(error);
      } finally {
        setLoading(false);
      }
    };
    getForecast();
  }, [spotId]);

  return { data: forecast, loading, errors };
};
