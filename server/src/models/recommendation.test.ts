import { when } from 'jest-when';

import {
  getBestBetLocations,
  getBestBetWindowsForLocation,
} from './recommendation';
import { getRemoteForecast } from './magic-seaweed/api';
import { Rating } from '../types/magic-seaweed';
import { ruggles, firstBeach, matunuck } from '../testing';

jest.mock('./magic-seaweed/api');
jest.mock('./magic-seaweed/spots', () => ({
  'Rhode Island': {
    '846': 'Second Beach',
    '907': 'First Beach',
    '377': 'Matunuck',
    '574': 'Ruggles',
  },
}));

describe('Recommendation', () => {
  describe('#getBestBetLocations', () => {
    beforeEach(() => {
      when(getRemoteForecast)
        .calledWith('574')
        .mockResolvedValueOnce(ruggles)
        .calledWith('377')
        .mockResolvedValueOnce(matunuck)
        .calledWith('907')
        .mockResolvedValueOnce(firstBeach);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    describe('Given a location', function () {
      it('returns the given array of location forecasts', async function () {
        const secondBeach = [
          {
            id: '846',
            localTimestamp: 2621983600,
            solidRating: 0 as Rating,
            fadedRating: 0 as Rating,
            swell: {
              components: {
                combined: {
                  height: 5.5,
                  period: 9,
                },
              },
            },
          },
          {
            id: '846',
            localTimestamp: 2621983601,
            solidRating: 1 as Rating,
            fadedRating: 0 as Rating,
            swell: {
              components: {
                combined: {
                  height: 5.5,
                  period: 9,
                },
              },
            },
          },
        ];

        when(getRemoteForecast)
          .calledWith('846')
          .mockResolvedValueOnce(secondBeach);

        const response = await getBestBetLocations('Rhode Island');

        expect(Array.isArray(response)).toBe(true);
        expect(response).toHaveLength(3);

        // @ts-ignore
        const rugglesResponse = response[0];
        expect(rugglesResponse).toMatchObject({ id: '574' });

        // @ts-ignore
        const secondResponse = response[1];
        expect(secondResponse).toMatchObject({ id: '846' });

        // @ts-ignore
        const matunuckResponse = response[2];
        expect(matunuckResponse).toMatchObject({ id: '377' });
      });
    });

    describe('Given a result count', function () {
      it('returns the exact number of location forecasts', async function () {
        const secondBeach = [
          {
            id: '846',
            localTimestamp: 2621983600,
            solidRating: 0 as Rating,
            fadedRating: 0 as Rating,
            swell: {
              components: {
                combined: {
                  height: 5.5,
                  period: 9,
                },
              },
            },
          },
          {
            id: '846',
            localTimestamp: 2621983601,
            solidRating: 1 as Rating,
            fadedRating: 0 as Rating,
            swell: {
              components: {
                combined: {
                  height: 5.5,
                  period: 9,
                },
              },
            },
          },
        ];

        when(getRemoteForecast)
          .calledWith('846')
          .mockResolvedValueOnce(secondBeach);

        const response = await getBestBetLocations('Rhode Island', 4);

        expect(Array.isArray(response)).toBe(true);
        expect(response).toHaveLength(4);
      });
    });

    describe('When there is a remote forecast api error', function () {
      it('only returns the error', async function () {
        const secondBeach = {
          error_response: {
            code: 501,
            error_msg: 'Something about incorrect parameters',
          },
        };
        when(getRemoteForecast)
          .calledWith('846')
          .mockResolvedValueOnce(secondBeach);

        const response = await getBestBetLocations('Rhode Island');

        expect(response).toEqual({
          error_response: {
            code: 501,
            error_msg: 'Something about incorrect parameters',
          },
        });
      });
    });

    describe('When there nothing is returned from the api', function () {
      it('only returns the error', async function () {
        // @ts-ignore
        when(getRemoteForecast).calledWith('846').mockResolvedValueOnce({});

        const response = await getBestBetLocations('Rhode Island');

        expect(response).toEqual({
          error_response: {
            code: 500,
            error_msg: 'Something is exceptionally wrong',
          },
        });
      });
    });
  });

  describe('#getBestBetWindowsForLocation', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    describe('Given a recommended spot', function () {
      it('returns the given array of time forecasts', async function () {
        const secondBeach = [
          {
            id: '846',
            localTimestamp: 2621983600,
            solidRating: 1 as Rating,
            fadedRating: 0 as Rating,
            swell: {
              components: {
                combined: {
                  height: 5.5,
                  period: 9,
                },
              },
            },
          },
          {
            id: '846',
            localTimestamp: 2621983601,
            solidRating: 2 as Rating,
            fadedRating: 0 as Rating,
            swell: {
              components: {
                combined: {
                  height: 5.5,
                  period: 9,
                },
              },
            },
          },
          {
            id: '846',
            localTimestamp: 2621983603,
            solidRating: 2 as Rating,
            fadedRating: 1 as Rating,
            swell: {
              components: {
                combined: {
                  height: 5.5,
                  period: 9,
                },
              },
            },
          },
        ];

        when(getRemoteForecast)
          .calledWith('846')
          .mockResolvedValueOnce(secondBeach);

        const response = await getBestBetWindowsForLocation('846');

        expect(Array.isArray(response)).toBe(true);
        expect(response).toHaveLength(3);

        // @ts-ignore
        const bestWindow = response[0];
        expect(bestWindow).toMatchObject({ localTimestamp: 2621983603 });

        // @ts-ignore
        const secondBestWindow = response[1];
        expect(secondBestWindow).toMatchObject({ localTimestamp: 2621983601 });

        // @ts-ignore
        const thirdBestWindow = response[2];
        expect(thirdBestWindow).toMatchObject({ localTimestamp: 2621983600 });
      });
    });

    describe('Given a result count', function () {
      it('returns the exact number of time windows', async function () {
        const secondBeach = [
          {
            id: '846',
            localTimestamp: 2621983600,
            solidRating: 1 as Rating,
            fadedRating: 0 as Rating,
            swell: {
              components: {
                combined: {
                  height: 5.5,
                  period: 9,
                },
              },
            },
          },
          {
            id: '846',
            localTimestamp: 2621983601,
            solidRating: 2 as Rating,
            fadedRating: 0 as Rating,
            swell: {
              components: {
                combined: {
                  height: 5.5,
                  period: 9,
                },
              },
            },
          },
          {
            id: '846',
            localTimestamp: 2621983603,
            solidRating: 3 as Rating,
            fadedRating: 1 as Rating,
            swell: {
              components: {
                combined: {
                  height: 5.5,
                  period: 9,
                },
              },
            },
          },
        ];

        when(getRemoteForecast)
          .calledWith('846')
          .mockResolvedValueOnce(secondBeach);

        const response = await getBestBetWindowsForLocation('846', 1);

        expect(Array.isArray(response)).toBe(true);
        expect(response).toHaveLength(1);
      });
    });

    describe('When nothing is worth it', () => {
      it('returns nothing', async function () {
        const secondBeach = [
          {
            id: '846',
            localTimestamp: 2621983600,
            solidRating: 0 as Rating,
            fadedRating: 0 as Rating,
            swell: {
              components: {
                combined: {
                  height: 5.5,
                  period: 9,
                },
              },
            },
          },
          {
            id: '846',
            localTimestamp: 2621983601,
            solidRating: 0 as Rating,
            fadedRating: 0 as Rating,
            swell: {
              components: {
                combined: {
                  height: 5.5,
                  period: 9,
                },
              },
            },
          },
          {
            id: '846',
            localTimestamp: 2621983603,
            solidRating: 0 as Rating,
            fadedRating: 1 as Rating,
            swell: {
              components: {
                combined: {
                  height: 5.5,
                  period: 9,
                },
              },
            },
          },
        ];

        when(getRemoteForecast)
          .calledWith('846')
          .mockResolvedValueOnce(secondBeach);

        const response = await getBestBetWindowsForLocation('846', 1);

        expect(Array.isArray(response)).toBe(true);
        expect(response).toHaveLength(0);
      });
    });

    describe('When there is a remote forecast api error', function () {
      it('only returns the error', async function () {
        const secondBeach = {
          error_response: {
            code: 501,
            error_msg: 'Something about incorrect parameters',
          },
        };
        when(getRemoteForecast)
          .calledWith('846')
          .mockResolvedValueOnce(secondBeach);

        const response = await getBestBetWindowsForLocation('846');

        expect(response).toEqual({
          error_response: {
            code: 501,
            error_msg: 'Something about incorrect parameters',
          },
        });
      });
    });

    describe('When there nothing is returned from the api', function () {
      it('only returns the error', async function () {
        // @ts-ignore
        when(getRemoteForecast).calledWith('846').mockResolvedValueOnce({});

        const response = await getBestBetWindowsForLocation('846');

        expect(response).toEqual({
          error_response: {
            code: 500,
            error_msg: 'Something is exceptionally wrong',
          },
        });
      });
    });
  });
});
