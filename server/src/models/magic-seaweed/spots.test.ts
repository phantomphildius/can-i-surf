import { getLocations } from './spots';

describe('Spots', () => {
  describe('#getLocations', () => {
    it('returns an array of formatted location objects', () => {
      expect(getLocations()).toMatchObject([
        { rhodeIsland: 'Rhode Island' },
        { hamptons: 'Hamptons' },
        { newYorkCity: 'New York City' },
        { newJersey: 'New Jersey' },
      ]);
    });
  });
});
