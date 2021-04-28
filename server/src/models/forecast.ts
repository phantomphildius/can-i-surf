import dayjs from 'dayjs';
import { Forecast } from '../types/magic-seaweed';
import { spotMap } from './magic-seaweed/spots';

export const getForecastLocationNameFromId = (spotId: string): string => {
  const regionalMaps = Object.values(spotMap);
  const correctRegionalMap = regionalMaps.find(
    (regionalSpotMap) => regionalSpotMap[spotId]
  );
  return correctRegionalMap?.[spotId] ?? 'Surf Spot';
};

export const unixTimeToWeekDay = (unixTimeStamp: number): string =>
  dayjs(unixTimeStamp * 1000).format('ddd');
export const unixTimeToTime = (unixTimeStamp: number): string =>
  dayjs(unixTimeStamp * 1000).format('hh:mm a');

export const sortForecasts = (forecastA: Forecast, forecastB: Forecast) =>
  forecastA.solidRating - forecastB.solidRating ||
  forecastA.fadedRating - forecastB.fadedRating ||
  forecastA.swell.components.combined.height -
    forecastB.swell.components.combined.height;
