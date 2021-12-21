import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Grommet } from 'grommet';
import { when } from 'jest-when';

import TimeWindows from './TimeWindows';
import { usePost } from '../hooks';

jest.mock('../hooks/usePost');
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    spotId: '846',
  }),
}));

const subject = () =>
  render(
    <Grommet plain>
      <BrowserRouter>
        <TimeWindows />
      </BrowserRouter>
    </Grommet>
  );

describe('TimeWindows', () => {
  describe('when the component is loading data', () => {
    beforeEach(() => {
      when(usePost)
        .calledWith('/recommendations/window', { spotId: '846' })
        .mockReturnValue({
          loading: true,
          data: undefined,
          errors: undefined,
        });
    });

    it('renders the loader', () => {
      subject();

      expect(screen.getByText('Building....')).toBeInTheDocument();
    });
  });

  describe('when the component is handed an error', () => {
    beforeEach(() => {
      when(usePost)
        .calledWith('/recommendations/window', { spotId: '846' })
        .mockReturnValue({
          loading: false,
          data: undefined,
          errors: { status: 422, details: 'it went wrong' },
        });
    });

    it('renders the returned error message', () => {
      subject();

      expect(screen.getByText('Nothing much out there')).toBeInTheDocument();
      expect(screen.getByText('it went wrong')).toBeInTheDocument();
    });
  });

  describe('when the component is handed the response', () => {
    beforeEach(() => {
      when(usePost)
        .calledWith('/recommendations/window', { spotId: '846' })
        .mockReturnValue({
          loading: false,
          data: [
            {
              recommendationRating: 3,
              recommendationTime: 1621983600,
              id: 1234,
            },
            {
              recommendationRating: 2,
              recommendationTime: 1621983810,
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

      const [bestTimeWindow, secondBest] = recommendations;

      expect(bestTimeWindow).toHaveTextContent('3/5 stars');
      expect(bestTimeWindow).toHaveTextContent('Tue at 07:00 pm');

      expect(secondBest).toHaveTextContent('2/5 stars');
      expect(secondBest).toHaveTextContent('Tue at 07:03 pm');
    });
  });
});
