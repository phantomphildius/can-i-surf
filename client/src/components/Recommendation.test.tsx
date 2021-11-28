import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Recommendation, { Props } from './Recommendation';

const subject = (recommendation: Props) =>
  render(
    <BrowserRouter>
      <Recommendation {...recommendation} />
    </BrowserRouter>
  );

describe('Recommnedation', () => {
  it('renders a surf location recommendation including a time and forecast', () => {
    const reco = {
      recommendationRating: 4,
      recommendationTime: 1621983600,
      recommendationLocationName: 'The bu',
      id: 4567,
    };

    subject(reco);

    expect(screen.getByText('The bu')).toBeInTheDocument();
    expect(
      screen.getByText('Will be a 4/5 stars on Tue at 07:00 pm')
    ).toBeInTheDocument();

    expect(screen.getByRole('link')).toHaveAttribute('href', '/4567');
  });
});
