import { render, screen } from '@testing-library/react';

import Header from './Header';

const subject = (region?: string) => render(<Header region={region} />);

describe('Header', () => {
  describe('with a surf region', () => {
    it('renders the region name', () => {
      subject('New York City');

      expect(
        screen.getByText('Can I Surf in New York City?')
      ).toBeInTheDocument();
    });
  });

  describe('without a surf region', () => {
    it('does not render with the region name', () => {
      subject();

      expect(screen.getByText(/Can I Surf?/)).toBeInTheDocument();
    });
  });
});
