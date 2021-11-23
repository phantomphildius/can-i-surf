import { response } from 'express';
import { when } from 'jest-when';

import { getBestBetLocations } from '../../models/recommendation';
import { createSpotRecommendation } from './spots';
import { ruggles } from '../../testing';
import { mockServerResponse } from '../../testing';

jest.mock('../../models/recommendation');

afterEach(() => {
  jest.restoreAllMocks();
});

describe('#createSpotRecommendation', () => {
  describe('Error States', () => {
    describe('without a location parameter', function () {
      it('returns a 422 error', async function () {
        const mockRequest = { body: { location: '' } } as any;
        const mockResponse = mockServerResponse() as any;

        await createSpotRecommendation(mockRequest, mockResponse);

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
        when(getBestBetLocations)
          .calledWith('Rhode Island', 3)
          .mockResolvedValueOnce({
            error_response: {
              code: 501,
              error_msg: 'Something about incorrect parameters',
            },
          });
      });

      it('returns a 400 error', async function () {
        const mockRequest = { body: { location: 'Rhode Island' } } as any;
        const mockResponse = mockServerResponse() as any;

        await createSpotRecommendation(mockRequest, mockResponse);

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
        when(getBestBetLocations)
          .calledWith('Rhode Island', 3)
          .mockResolvedValueOnce({
            error_response: {
              code: 500,
              error_msg: 'Something is exceptionally wrong',
            },
          });
      });

      it('returns a 500 error', async () => {
        const mockRequest = { body: { location: 'Rhode Island' } } as any;
        const mockResponse = mockServerResponse() as any;

        await createSpotRecommendation(mockRequest, mockResponse);

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
      when(getBestBetLocations)
        .calledWith('Rhode Island', 3)
        .mockResolvedValueOnce(ruggles);
    });
    it('returns a recommendation collection', async () => {
      jest.mock('../../models/magic-seaweed/spots', () => ({
        '574': 'Ruggles',
      }));

      const mockRequest = { body: { location: 'Rhode Island' } } as any;
      const mockResponse = mockServerResponse() as any;

      await createSpotRecommendation(mockRequest, mockResponse);

      expect(mockResponse.status).toBeCalledWith(201);
      expect(mockResponse.json).toBeCalledWith([
        {
          id: '574',
          recommendationLocationName: 'Ruggles',
          recommendationRating: 3,
          recommendationTime: 1621983600,
        },
        {
          id: '574',
          recommendationLocationName: 'Ruggles',
          recommendationRating: 4,
          recommendationTime: 1621983601,
        },
      ]);
    });
  });
});
