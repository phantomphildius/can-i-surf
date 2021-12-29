import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Header from './Header';

const subject = (region?: string) =>
  render(
    <BrowserRouter>
      <Header region={region} />
    </BrowserRouter>
  );

describe('Header', () => {
  describe('with a surf region', () => {
    it('renders the region name', () => {
      subject('rhodeIsland');

      expect(screen.getByText('Can I Surf')).toBeInTheDocument();
      expect(screen.getByText('in Rhode Island?')).toBeInTheDocument();
    });
  });

  describe('without a surf region', () => {
    it('does not render with the region name', () => {
      subject();

      expect(screen.getByText(/Can I Surf\?/)).toBeInTheDocument();
    });
  });
});
