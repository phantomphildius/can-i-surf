import { when } from 'jest-when';

import { createForecasts } from './forecasts';
import { mockServerResponse, ruggles } from '../../testing';
import { getRemoteForecast } from '../../models/magic-seaweed/api';

jest.mock('../../models/magic-seaweed/api');

afterEach(() => {
  jest.restoreAllMocks();
});

describe('#createForecasts', () => {
  describe('Error States', () => {
    describe('without a location parameter', function () {
      it('returns a 422 error', async function () {
        const mockRequest = { body: { spotId: '' } } as any;
        const mockResponse = mockServerResponse() as any;

        await createForecasts(mockRequest, mockResponse);

        expect(mockResponse.status).toBeCalledWith(422);
        expect(mockResponse.json).toBeCalledWith(
          expect.objectContaining({
            code: 422,
            details: "Forgot to wax your board. You're missing something!",
          })
        );
      });
    });

    describe('when the api returns an error', function () {
      beforeEach(() => {
        when(getRemoteForecast)
          .calledWith('2159')
          .mockResolvedValueOnce({
            error_response: {
              code: 501,
              error_msg: 'Something about incorrect parameters',
            },
          });
      });

      it('returns a 400 error', async function () {
        const mockRequest = { body: { spotId: '2159' } } as any;
        const mockResponse = mockServerResponse() as any;

        await createForecasts(mockRequest, mockResponse);

        expect(mockResponse.status).toBeCalledWith(400);
        expect(mockResponse.json).toBeCalledWith(
          expect.objectContaining({
            code: 400,
            details:
              'Kinda like using the wrong fin box, some data is mismatched. Try again later.',
          })
        );
      });
    });

    describe('when something goes wrong', function () {
      beforeEach(() => {
        when(getRemoteForecast)
          .calledWith('2159')
          .mockResolvedValueOnce({
            error_response: {
              code: 500,
              error_msg: 'Something is exceptionally wrong',
            },
          });
      });

      it('returns a 500 error', async () => {
        const mockRequest = { body: { spotId: '2159' } } as any;
        const mockResponse = mockServerResponse() as any;

        await createForecasts(mockRequest, mockResponse);

        expect(mockResponse.status).toBeCalledWith(500);
        expect(mockResponse.json).toBeCalledWith(
          expect.objectContaining({
            details:
              'Close out. Something unforecasted happened. Try again later.',
            code: 500,
          })
        );
      });
    });
  });

  describe('Success State', () => {
    beforeEach(() => {
      when(getRemoteForecast).calledWith('574').mockResolvedValueOnce(ruggles);
    });
    it('returns a recommendation collection', async () => {
      const mockRequest = { body: { spotId: '574' } } as any;
      const mockResponse = mockServerResponse() as any;

      await createForecasts(mockRequest, mockResponse);

      expect(mockResponse.status).toBeCalledWith(201);
      expect(mockResponse.json).toBeCalledWith(ruggles);
    });
  });
});
