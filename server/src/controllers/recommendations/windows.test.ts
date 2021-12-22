import { when } from 'jest-when';

import { getBestBetWindowsForLocation } from '../../models/recommendation';
import { createWindowRecommendation } from './windows';
import { ruggles } from '../../testing';
import { mockServerResponse } from '../../testing';

jest.mock('../../models/recommendation');

afterEach(() => {
  jest.restoreAllMocks();
});

describe('#createWindowRecommendation', () => {
  describe('Error States', () => {
    describe('without a spotId parameter', function () {
      it('returns a 422 error', async function () {
        const mockRequest = { body: { spotId: '' } } as any;
        const mockResponse = mockServerResponse() as any;

        await createWindowRecommendation(mockRequest, mockResponse);

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
        when(getBestBetWindowsForLocation)
          .calledWith('574')
          .mockResolvedValueOnce({
            error_response: {
              code: 501,
              error_msg: 'Something about incorrect parameters',
            },
          });
      });

      it('returns a 400 error', async function () {
        const mockRequest = { body: { spotId: '574' } } as any;
        const mockResponse = mockServerResponse() as any;

        await createWindowRecommendation(mockRequest, mockResponse);

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
        when(getBestBetWindowsForLocation)
          .calledWith('574')
          .mockResolvedValueOnce({
            error_response: {
              code: 500,
              error_msg: 'Something is exceptionally wrong',
            },
          });
      });

      it('returns a 500 error', async () => {
        const mockRequest = { body: { spotId: '574' } } as any;
        const mockResponse = mockServerResponse() as any;

        await createWindowRecommendation(mockRequest, mockResponse);

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
      when(getBestBetWindowsForLocation)
        .calledWith('574')
        .mockResolvedValueOnce(ruggles);
    });
    it("returns a recommendation for a spot's windows collection", async () => {
      const mockRequest = { body: { spotId: '574' } } as any;
      const mockResponse = mockServerResponse() as any;

      await createWindowRecommendation(mockRequest, mockResponse);

      expect(mockResponse.status).toBeCalledWith(201);
      expect(mockResponse.json).toBeCalledWith([
        {
          id: '574',
          wind: {
            direction: 'SW',
            speed: 12,
          },
          swell: {
            direction: 'NW',
            height: 5.5,
            period: 9,
          },
          time: 1621983600,
        },
        {
          id: '574',
          wind: {
            direction: 'SW',
            speed: 12,
          },
          swell: {
            direction: 'NW',
            height: 5.5,
            period: 9,
          },
          time: 1621983601,
        },
      ]);
    });
  });
});
