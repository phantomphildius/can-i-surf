import { Forecast, SwellForecast } from '../types';
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

const calculateSwellMagnitude = (swell: SwellForecast): number => {
  const { compassDirection: _compassDirection, ...magnitudeProperties } =
    swell.components.combined;
  return Object.values(magnitudeProperties).reduce(
    (memo, value) => memo + value,
    0
  );
};
