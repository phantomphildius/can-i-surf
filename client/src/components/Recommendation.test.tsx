import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Recommendation, { Props } from './Recommendation';

const subject = (recommendation: Props) =>
  render(
    <BrowserRouter>
      <Recommendation {...recommendation} />
    </BrowserRouter>
  );

describe('Recommendation', () => {
  describe('when the recommendation is provided with a name and show more link flag', () => {
    it('renders a surf location recommendation including a time and forecast with a heading and link', () => {
      const reco = {
        recommendationRating: 4,
        recommendationTime: 1621983600,
        recommendationLocationName: 'The bu',
        id: 4567,
        showSeeMoreLink: true,
      };

      subject(reco);

      expect(screen.getByRole('heading')).toBeInTheDocument();
      expect(screen.getByText('The bu')).toBeInTheDocument();
      expect(
        screen.getByText('Will be a 4/5 stars on Tue at 07:00 pm')
      ).toBeInTheDocument();

      expect(screen.getByRole('link')).toHaveAttribute('href', '/4567');
      expect(screen.getByText('See more')).toBeInTheDocument();
    });
  });

  describe('when the recommendation is provided with a name and no show more link flag', () => {
    it('renders a surf location recommendation including a time and forecast with a heading', () => {
      const reco = {
        recommendationRating: 4,
        recommendationTime: 1621983600,
        recommendationLocationName: 'The bu',
        id: 4567,
        showSeeMoreLink: false,
      };

      subject(reco);

      expect(screen.getByRole('heading')).toBeInTheDocument();
      expect(screen.getByText('The bu')).toBeInTheDocument();
      expect(
        screen.getByText('Will be a 4/5 stars on Tue at 07:00 pm')
      ).toBeInTheDocument();

      expect(screen.queryByRole('link')).toBeNull();
      expect(screen.queryByText('See more')).toBeNull();
    });
  });

  describe('when the recommendation is provided without a name and show more link flag', () => {
    it('renders a surf location recommendation including a time and forecast', () => {
      const reco = {
        recommendationRating: 4,
        recommendationTime: 1621983600,
        id: 4567,
        showSeeMoreLink: false,
      };

      subject(reco);

      expect(screen.queryByRole('heading')).toBeNull();
      expect(
        screen.getByText('Will be a 4/5 stars on Tue at 07:00 pm')
      ).toBeInTheDocument();

      expect(screen.queryByRole('link')).toBeNull();
    });
  });
});
