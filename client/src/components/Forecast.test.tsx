import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { when } from 'jest-when';

import Forecast from './Forecast';
import { usePost } from '../hooks';

jest.mock('../hooks');
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    spotId: '73',
  }),
}));

const subject = () =>
  render(
    <BrowserRouter>
      <Forecast />
    </BrowserRouter>
  );

describe('Forecast', () => {
  describe('when the component is loading data', () => {
    beforeEach(() => {
      when(usePost)
        .calledWith('/magic_seaweed/forecasts', { spotId: '73' })
        .mockReturnValue({
          loading: true,
          data: undefined,
          errors: undefined,
        });
    });

    it('renders the loader', () => {
      subject();

      expect(screen.getByText('Building...')).toBeInTheDocument();
    });
  });

  describe('when the component is handed an error', () => {
    beforeEach(() => {
      when(usePost);
      when(usePost)
        .calledWith('/magic_seaweed/forecasts', { spotId: '73' })
        .mockReturnValue({
          loading: false,
          data: undefined,
          errors: { status: 422, details: 'it went wrong' },
        });
    });

    it('renders the returned error message', () => {
      subject();

      expect(screen.getByText('it went wrong')).toBeInTheDocument();
    });
  });

  describe('when the component is handed the response', () => {
    beforeEach(() => {
      when(usePost)
        .calledWith('/magic_seaweed/forecasts', { spotId: '73' })
        .mockReturnValue({
          loading: false,
          data: [
            {
              id: '73',
              localTimestamp: 1621983600,
              solidRating: 3,
              fadedRating: 3,
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
              id: '73',
              localTimestamp: 1621983601,
              solidRating: 4,
              fadedRating: 4,
              swell: {
                components: {
                  combined: {
                    height: 5.5,
                    period: 9,
                  },
                },
              },
            },
          ],
          errors: undefined,
        });
    });

    it('renders the returned forecast', () => {
      subject();

      const forecasts = screen.getAllByTestId('forecast', {
        exact: false,
      });

      expect(forecasts.length).toBe(2);

      expect(forecasts[0]).toHaveTextContent('3');
      expect(forecasts[1]).toHaveTextContent('4');
    });
  });
});
