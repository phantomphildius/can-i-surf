import mockAxios from 'jest-mock-axios';

import { getRemoteForecast } from './api';
import { Forecast, MagicSeaweedApiError } from '../../types/magic-seaweed';
import { ruggles } from '../../testing';

const baseRequestParams = {
  fields:
    'fadedRating,solidRating,swell.components.combined.height,swell.components.combined.period,localTimestamp',
  units: 'us',
};

afterEach(() => {
  mockAxios.reset();
});

describe('Api', () => {
  describe('#getRemoteForecast', function () {
    describe('Magic seaweed errors', function () {
      describe('when there is an invalid parameter', function () {
        it('returns the error', async function () {
          const errorResponse = {
            data: {
              error_response: {
                code: 501,
                error_msg:
                  'Invalid parameters were supplied and did not pass our validation, please double check your request.',
              },
            },
          };

          const promise = getRemoteForecast('locals-only');

          expect(mockAxios.get).toHaveBeenCalledWith('/forecast', {
            params: { spot_id: 'locals-only', ...baseRequestParams },
          });

          mockAxios.mockResponse(errorResponse);

          const response = (await promise) as MagicSeaweedApiError;

          expect(response.error_response).toEqual({
            code: 501,
            error_msg:
              'Invalid parameters were supplied and did not pass our validation, please double check your request.',
          });
        });
      });

      describe('when the api key is invalid', function () {
        it('returns the error', async function () {
          const errorResponse = {
            data: {
              error_response: {
                code: 116,
                error_msg:
                  'Unable to authenticate request: API key is invalid.',
              },
            },
          };

          const promise = getRemoteForecast('2807');

          expect(mockAxios.get).toHaveBeenCalledWith('/forecast', {
            params: { spot_id: '2807', ...baseRequestParams },
          });

          mockAxios.mockResponse(errorResponse);
          const response = (await promise) as MagicSeaweedApiError;

          expect(response.error_response).toEqual({
            code: 116,
            error_msg: 'Unable to authenticate request: API key is invalid.',
          });
        });
      });
    });

    describe('Network errors', function () {
      it('returns the error', async function () {
        const promise = getRemoteForecast('2807');

        mockAxios.mockError({ status: 500 });

        const response = (await promise) as MagicSeaweedApiError;

        expect(response.error_response).toEqual({
          code: 500,
          error_msg: 'Something is exceptionally wrong',
        });
      });
    });

    describe('when the the request is successful', function () {
      it('returns an array of forecast objects', async function () {
        const promise = getRemoteForecast('574');

        expect(mockAxios.get).toHaveBeenCalledWith('/forecast', {
          params: { spot_id: '574', ...baseRequestParams },
        });

        mockAxios.mockResponse({ data: ruggles });

        const response = (await promise) as Forecast[];

        expect(response).toEqual([
          {
            id: '574',
            localTimestamp: 1621983600,
            solidRating: 3,
            fadedRating: 0,
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
            id: '574',
            localTimestamp: 1621983601,
            solidRating: 4,
            fadedRating: 0,
            swell: {
              components: {
                combined: {
                  height: 5.5,
                  period: 9,
                },
              },
            },
          },
        ]);
      });
    });
  });
});
