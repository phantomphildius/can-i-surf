import { mockServerResponse } from '../../testing';
import { getRecommendationLocations } from './locations';

describe('getRecommendationLocations', () => {
  it('Returns the locations to render', () => {
    const mockResponse = mockServerResponse() as any;

    const locationResponse = getRecommendationLocations(
      jest.fn() as any,
      mockResponse
    );

    expect(locationResponse.status).toBeCalledWith(200);
    expect(locationResponse.json).toBeCalledWith([
      { rhodeIsland: 'Rhode Island' },
      { theHamptons: 'The Hamptons' },
      { newYorkCity: 'New York City' },
      { newJersey: 'New Jersey' },
      { massachusetts: 'Massachusetts' },
      { capeAndTheIslands: 'Cape And The Islands' },
    ]);
  });
});
