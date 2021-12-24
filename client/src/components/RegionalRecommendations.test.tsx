import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Grommet } from 'grommet';
import { when } from 'jest-when';

import RegionalRecommendations from './RegionalRecommendations';
import { usePost, useBreakpoint } from '../hooks';
import userEvent from '@testing-library/user-event';

jest.mock('../hooks/usePost');
jest.mock('../hooks/useBreakpoint');
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
              swell: {
                height: 8.2,
                direction: 'SSE',
                period: 10,
              },
              wind: {
                speed: 14,
                direction: 'SE',
              },
              time: 1621983600,
              locationName: 'Pipe',
              id: 1234,
            },
            {
              swell: {
                height: 8.2,
                direction: 'SSE',
                period: 10,
              },
              wind: {
                speed: 14,
                direction: 'SE',
              },
              time: 1621983610,
              locationName: 'Rockies',
              id: 6789,
            },
          ],
          errors: undefined,
        });

      when(usePost)
        .calledWith('/recommendations/window', { spotId: 1234 })
        .mockReturnValue({
          loading: false,
          data: [
            {
              swell: {
                height: 8.2,
                direction: 'SSE',
                period: 10,
              },
              wind: {
                speed: 14,
                direction: 'SE',
              },
              time: 1621983600,
              id: 1234,
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

    it('displays more details when a recommendation is chosen as a modal', async function () {
      subject();

      const bestRecommendation = screen.getByTestId('recommendation-Pipe');
      const seeMoreButton = within(bestRecommendation).getByRole('button');

      expect(seeMoreButton).toHaveTextContent('See more');

      userEvent.click(seeMoreButton);

      const detailsHeader = await screen.findByTestId('details-header-Pipe');
      expect(detailsHeader).toHaveTextContent('Pipe');

      expect(screen.getByRole('dialog')).toBeInTheDocument();

      const timeWindows = screen.getAllByTestId('recommendation-1621983600');

      expect(timeWindows.length).toEqual(1);
    });

    describe('when on a large screen', () => {
      beforeEach(() => {
        when(useBreakpoint).calledWith().mockReturnValue('large');
      });

      it('displays the details section as a new column', async function () {
        subject();

        const bestRecommendation = screen.getByTestId('recommendation-Pipe');
        const seeMoreButton = within(bestRecommendation).getByRole('button');

        userEvent.click(seeMoreButton);

        const header = await screen.findByRole('heading', { level: 4 });
        expect(header).toHaveTextContent('Other time windows');
      });
    });
  });
});
