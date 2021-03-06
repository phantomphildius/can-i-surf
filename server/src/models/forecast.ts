import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { Forecast, SwellForecast } from '../types';
import spotMap from './magic-seaweed/spots';

export const getForecastLocationNameFromId = (spotId: string): string => {
  const regionalMaps = Object.values(spotMap);
  const correctRegionalMap = regionalMaps.find(
    (regionalSpotMap) => regionalSpotMap[spotId]
  );
  return correctRegionalMap?.[spotId] ?? 'Surf Spot';
};

export const sortForecasts = (
  forecastA: Forecast,
  forecastB: Forecast
): number =>
  forecastB.solidRating - forecastA.solidRating ||
  forecastB.fadedRating - forecastA.fadedRating ||
  calculateSwellMagnitude(forecastB.swell) -
    calculateSwellMagnitude(forecastA.swell);

const calculateSwellMagnitude = (swell: SwellForecast): number => {
  const { compassDirection: _compassDirection, ...magnitudeProperties } =
    swell.components.combined;
  return Object.values(magnitudeProperties).reduce(
    (memo, value) => memo + value,
    0
  );
};

export const isPastForecast = (forecast: Forecast) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  return dayjs
    .tz(dayjs(), 'America/New_York')
    .isAfter(forecast.localTimestamp * 1000);
};
