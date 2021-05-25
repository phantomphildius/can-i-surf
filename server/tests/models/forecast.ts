import { expect } from 'chai';

import {
  getForecastLocationNameFromId,
  sortForecasts,
} from '../../src/models/forecast';
import { Rating } from '../../src/types/magic-seaweed';

describe('Forecast', () => {
  describe('#getForecastLocationNameFromID', () => {
    it('returns the forecast location name given an id', () => {
      const locationName = getForecastLocationNameFromId('574');
      expect(locationName).to.eq('Ruggles');
    });

    it('returns the default forecast location name given a bogus id', () => {
      const locationName = getForecastLocationNameFromId('test');
      expect(locationName).to.eq('Surf Spot');
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

      expect(sortedForecasts).to.eq(
        2,
        'because forecastB has a higher solid rating'
      );
      expect(reverseSortedForecasts).to.eq(
        -2,
        'because forecastB has a higher solid rating'
      );
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

      expect(sortedForecasts).to.eq(
        -1,
        'because forecastA has a higher faded rating'
      );
      expect(reverseSortedForecasts).to.eq(
        1,
        'because forecastA has a higher faded rating'
      );
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

      expect(sortedForecasts).to.eq(
        -1,
        'because forecastA has a higher swell magnitude'
      );
      expect(reverseSortedForecasts).to.eq(
        1,
        'because forecastA has a higher swell magnitude'
      );
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

      expect(sortedForecasts).to.eq(
        0,
        'because forecastA has a higher swell magnitude'
      );
    });
  });
});
