import {
  getForecastLocationNameFromId,
  isPastForecast,
  sortForecasts,
} from './forecast';
import { Forecast, Rating } from '../types/magic-seaweed';

describe('Forecast', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('#getForecastLocationNameFromID', () => {
    it('returns the forecast location name given an id', () => {
      const locationName = getForecastLocationNameFromId('574');
      expect(locationName).toBe('Ruggles');
    });

    it('returns the default forecast location name given a bogus id', () => {
      const locationName = getForecastLocationNameFromId('test');
      expect(locationName).toBe('Surf Spot');
    });
  });

  describe('#sortForecasts', () => {
    it('sorts forecasts by their solid rating first', () => {
      const forecastA = {
        id: '4',
        localTimestamp: 1234567890,
        solidRating: 1 as Rating,
        fadedRating: 5 as Rating,
        swell: { components: { combined: { height: 3, period: 1 } } },
      };
      const forecastB = {
        id: '4',
        localTimestamp: 1234567890,
        solidRating: 3 as Rating,
        fadedRating: 4 as Rating,
        swell: { components: { combined: { height: 2, period: 1 } } },
      };
      const sortedForecasts = sortForecasts(forecastA, forecastB);
      const reverseSortedForecasts = sortForecasts(forecastB, forecastA);

      expect(sortedForecasts).toBe(2);
      expect(reverseSortedForecasts).toBe(-2);
    });

    it('sorts forecasts by their faded rating second', () => {
      const forecastA = {
        id: '4',
        localTimestamp: 1234567890,
        solidRating: 3 as Rating,
        fadedRating: 5 as Rating,
        swell: { components: { combined: { height: 3, period: 1 } } },
      };
      const forecastB = {
        id: '4',
        localTimestamp: 1234567890,
        solidRating: 3 as Rating,
        fadedRating: 4 as Rating,
        swell: { components: { combined: { height: 3, period: 1 } } },
      };
      const sortedForecasts = sortForecasts(forecastA, forecastB);
      const reverseSortedForecasts = sortForecasts(forecastB, forecastA);

      expect(sortedForecasts).toBe(-1);
      expect(reverseSortedForecasts).toBe(1);
    });

    it('sorts forecasts by their swell magnitude last', () => {
      const forecastA = {
        id: '4',
        localTimestamp: 1234567890,
        solidRating: 3 as Rating,
        fadedRating: 5 as Rating,
        swell: { components: { combined: { height: 3, period: 2 } } },
      };
      const forecastB = {
        id: '4',
        localTimestamp: 1234567890,
        solidRating: 3 as Rating,
        fadedRating: 5 as Rating,
        swell: { components: { combined: { height: 3, period: 1 } } },
      };
      const sortedForecasts = sortForecasts(forecastA, forecastB);
      const reverseSortedForecasts = sortForecasts(forecastB, forecastA);

      expect(sortedForecasts).toBe(-1);
      expect(reverseSortedForecasts).toBe(1);
    });

    it('does not sort if ratings are the same', () => {
      const forecastA = {
        id: '4',
        localTimestamp: 1234567890,
        solidRating: 3 as Rating,
        fadedRating: 5 as Rating,
        swell: { components: { combined: { height: 3, period: 1 } } },
      };
      const forecastB = {
        id: '4',
        localTimestamp: 1234567890,
        solidRating: 3 as Rating,
        fadedRating: 5 as Rating,
        swell: { components: { combined: { height: 3, period: 1 } } },
      };
      const sortedForecasts = sortForecasts(forecastA, forecastB);

      expect(sortedForecasts).toBe(0);
    });
  });

  describe('#isPastForecast', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2022-01-04'));
    });

    it('returns true when the forecast is in the past', () => {
      const forecast = { localTimestamp: 1641234066 } as Forecast;

      expect(isPastForecast(forecast)).toEqual(true);
    });

    it('returns false when the forecast is in the future', () => {
      const forecast = { localTimestamp: 1641330055 } as Forecast;

      expect(isPastForecast(forecast)).toEqual(false);
    });
  });
});
