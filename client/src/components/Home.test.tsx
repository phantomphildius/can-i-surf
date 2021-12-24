import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { when } from 'jest-when';
import { Grommet } from 'grommet';

import Home from './Home';
import { useFetch } from '../hooks';

jest.mock('../hooks/useFetch');

const subject = () =>
  render(
    <Grommet plain>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Grommet>
  );

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Home', () => {
  describe('When the data is loading', () => {
    beforeEach(() => {
      when(useFetch).calledWith('/recommendations/locations').mockReturnValue({
        loading: true,
        data: undefined,
        errors: undefined,
      });
    });

    it('renders the title with loading state', () => {
      subject();

      expect(screen.getByText("Let's find out...")).toBeInTheDocument();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });

  describe('When the data is loaded', () => {
    beforeEach(() => {
      when(useFetch)
        .calledWith('/recommendations/locations')
        .mockReturnValue({
          loading: false,
          data: [
            { rhodeIsland: 'Rhode Island' },
            { northShore: 'North Shore' },
            { obx: 'Outer Banks' },
          ],
          errors: undefined,
        });
    });

    it('renders the title with loading state', () => {
      subject();

      expect(
        screen.getByText("Let's find out! Choose a region to start")
      ).toBeInTheDocument();
      expect(screen.getAllByRole('link').length).toEqual(3);
      expect(screen.getByText('Outer Banks')).toBeInTheDocument();
      expect(screen.getByText('North Shore')).toBeInTheDocument();
      expect(screen.getByText('Rhode Island')).toBeInTheDocument();
    });
  });
});
