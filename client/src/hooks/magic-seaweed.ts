import { useState, useEffect } from 'react';
import axios from 'axios';

type Rating = 1 | 2 | 3 | 4 | 5;

interface SwellForecast {
  components: {
    combined: {
      height: number;
      period: number;
    };
  };
}

export interface Forecast {
  localTimestamp: number;
  fadedRating: Rating;
  solidRating: Rating;
  swell: SwellForecast;
}

export const useForecast = (spotId: number): { forecast: Forecast[] } => {
  const [forecast, setForecast] = useState<Forecast[]>([]);

  useEffect(() => {
    const getForecast = async () =>
      await axios.get<Forecast[]>(`/magic_seaweed/forecasts/${spotId}`);

    getForecast()
      .then((res) => setForecast(res.data))
      .catch((err) => {
        throw new Error(err);
      });
  }, [spotId]);

  return { forecast };
};
