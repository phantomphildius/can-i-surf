import { Forecast, SwellForecast } from '../types/magic-seaweed';
import spotMap from './magic-seaweed/spots';

export const getForecastLocationNameFromId = (spotId: string): string => {
  const regionalMaps = Object.values(spotMap);
  const correctRegionalMap = regionalMaps.find(
    (regionalSpotMap) => regionalSpotMap[spotId]
  );
  return correctRegionalMap?.[spotId] ?? 'Surf Spot';
};

export const sortForecasts = (forecastA: Forecast, forecastB: Forecast) =>
  forecastB.solidRating - forecastA.solidRating ||
  forecastB.fadedRating - forecastA.fadedRating ||
  calculateSwellMagnitude(forecastB.swell) -
    calculateSwellMagnitude(forecastA.swell);

const calculateSwellMagnitude = (swell: SwellForecast): number =>
  Object.values(swell.components.combined).reduce(
    (memo, value) => memo + value,
    0
  );
