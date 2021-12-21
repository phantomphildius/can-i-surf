import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Grommet } from 'grommet';
import { when } from 'jest-when';

import RegionalRecommendations from './RegionalRecommendations';
import { usePost } from '../hooks';

jest.mock('../hooks/usePost');
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    region: 'rhodeIsland',
  }),
}));

const subject = () =>
  render(
    <Grommet plain>
      <BrowserRouter>
        <RegionalRecommendations />
      </BrowserRouter>
    </Grommet>
  );

describe('RegionalRecommendations', () => {
  describe('when the component is loading data', () => {
    beforeEach(() => {
      when(usePost)
        .calledWith('/recommendations/spot', { location: 'rhodeIsland' })
        .mockReturnValue({
          loading: true,
          data: undefined,
          errors: undefined,
        });
    });

    it('renders the loader', () => {
      subject();

      expect(screen.getByText('Finding out...')).toBeInTheDocument();
    });
  });

  describe('when the component is handed an error', () => {
    beforeEach(() => {
      when(usePost)
        .calledWith('/recommendations/spot', { location: 'rhodeIsland' })
        .mockReturnValue({
          loading: false,
          data: undefined,
          errors: { status: 422, details: 'it went wrong' },
        });
    });

    it('renders the returned error message', () => {
      subject();

      expect(screen.getByText('Guess not! Bummer dude')).toBeInTheDocument();
      expect(screen.getByText('it went wrong')).toBeInTheDocument();
    });
  });

  describe('when the component is handed the response', () => {
    beforeEach(() => {
      when(usePost)
        .calledWith('/recommendations/spot', { location: 'rhodeIsland' })
        .mockReturnValue({
          loading: false,
          data: [
            {
              recommendationRating: 3,
              recommendationTime: 1621983600,
              recommendationLocationName: 'Pipe',
              id: 1234,
            },
            {
              recommendationRating: 2,
              recommendationTime: 1621983610,
              recommendationLocationName: 'Rockies',
              id: 6789,
            },
          ],
          errors: undefined,
        });
    });

    it('renders the returned recommendations', () => {
      subject();

      const recommendations = screen.getAllByTestId('recommendation', {
        exact: false,
      });

      expect(recommendations.length).toBe(2);

      expect(recommendations[0]).toHaveTextContent('Pipe');
      expect(recommendations[1]).toHaveTextContent('Rockies');
    });
  });
});
