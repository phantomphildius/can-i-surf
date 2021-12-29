import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { when } from 'jest-when';
import { Grommet } from 'grommet';

import Home from './Home';
import { useFetch } from '../hooks';
import theme from '../theme';

jest.mock('../hooks/useFetch');

const subject = () =>
  render(
    <Grommet theme={theme}>
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

    it('renders the title with loading state', async () => {
      subject();

      expect(screen.getByText('Loading locations')).toBeInTheDocument();
      const link = await screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent('About');
      expect(link).toHaveAttribute('href', '/about');
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

      const obxLink = screen.getByText('Outer Banks').closest('a');
      expect(obxLink).toBeInTheDocument();
      expect(obxLink).toHaveAttribute('href', '/spots/obx');

      const northShoreLink = screen.getByText('North Shore').closest('a');
      expect(northShoreLink).toBeInTheDocument();
      expect(northShoreLink).toHaveAttribute('href', '/spots/northShore');

      const rhodeyLink = screen.getByText('Rhode Island').closest('a');
      expect(rhodeyLink).toBeInTheDocument();
      expect(rhodeyLink).toHaveAttribute('href', '/spots/rhodeIsland');
    });
  });
});
