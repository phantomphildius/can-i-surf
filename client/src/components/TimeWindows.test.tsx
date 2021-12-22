import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Grommet } from 'grommet';
import { when } from 'jest-when';

import TimeWindows from './TimeWindows';
import { usePost } from '../hooks';

jest.mock('../hooks/usePost');

const handleClose = jest.fn();
const subject = () =>
  render(
    <Grommet plain>
      <TimeWindows
        spot={{ id: 846, name: 'Second Beach' }}
        handleCloseButton={handleClose}
      />
    </Grommet>
  );

describe('TimeWindows', () => {
  describe('when the component is loading data', () => {
    beforeEach(() => {
      when(usePost)
        .calledWith('/recommendations/window', { spotId: 846 })
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
        .calledWith('/recommendations/window', { spotId: 846 })
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
        .calledWith('/recommendations/window', { spotId: 846 })
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
            {
              swell: {
                height: 4.2,
                direction: 'SSE',
                period: '7',
              },
              wind: {
                speed: 14,
                direction: 'SE',
              },
              time: 1621983810,
              id: 6789,
            },
          ],
          errors: undefined,
        });
    });

    it('renders the returned recommendations', () => {
      subject();

      const header = screen.getByRole('heading');
      expect(header).toHaveTextContent('Other time windows'); // TODO: responsive tests

      const recommendations = screen.getAllByTestId('recommendation', {
        exact: false,
      });

      expect(recommendations.length).toBe(2);

      const [bestTimeWindow, secondBest] = recommendations;

      expect(bestTimeWindow).toHaveTextContent(
        'On Tue at 07:00 pm the swell will be 8.2 feet coming from the SSE @ 10 seconds.The wind will be 14 MPH from the SE.'
      );

      expect(secondBest).toHaveTextContent(
        'On Tue at 07:03 pm the swell will be 4.2 feet coming from the SSE @ 7 seconds.The wind will be 14 MPH from the SE.'
      );

      expect(screen.queryByText('See more')).toBeNull();
    });

    it('handles the close button click appropriately', () => {
      subject();

      const closeButton = screen.getByRole('button');
      userEvent.click(closeButton);

      expect(handleClose).toHaveBeenCalled();
    });
  });
});
