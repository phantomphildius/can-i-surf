import { hasError } from './api-handlers';

describe('#hasError', () => {
  describe('when there is an error', () => {
    it('returns true', () => {
      const error = { details: 'boom', status: 500 };

      expect(hasError(error)).toEqual(true);
    });
  });

  describe('when there is not an error', () => {
    it('returns true', () => {
      const error = {};

      expect(hasError(error)).toEqual(false);
    });
  });
});
