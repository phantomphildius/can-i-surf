import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Home from './Home';

const subject = () =>
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

describe('Home', () => {
  it('renders the title and location links', () => {
    subject();

    expect(
      screen.getByText("Let's find out! Choose a region to start")
    ).toBeInTheDocument();
    expect(screen.getByText('Rhode Island')).toBeInTheDocument();
    expect(screen.getByText('Hamptons')).toBeInTheDocument();
  });
});
