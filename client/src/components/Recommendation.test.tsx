import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    const spotHandler = jest.fn();
    const reco = {
      swell: {
        height: 5,
        period: 12,
        direction: 'S',
      },
      wind: {
        speed: 11,
        direction: 'SW',
      },
      time: 1621983600,
      locationName: 'The bu',
      id: 4567,
      showSeeMoreLink: true,
      handleSpotSelection: spotHandler,
    };

    it('renders a surf location recommendation including a time and forecast with a heading and link', () => {
      subject(reco);

      expect(screen.getByRole('heading')).toBeInTheDocument();
      expect(screen.getByText('The bu')).toBeInTheDocument();
      expect(
        screen.getByText(
          'On Tue at 07:00 pm the swell will be 5 feet coming from the S @ 12 seconds.'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'On Tue at 07:00 pm the swell will be 5 feet coming from the S @ 12 seconds.'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText('The wind will be 11 MPH from the SW.')
      ).toBeInTheDocument();

      expect(screen.getByText('See more')).toBeInTheDocument();
    });

    it('assigns spotId on seeMore button click', () => {
      subject(reco);

      const seeMoreButton = screen.getByRole('button');

      userEvent.click(seeMoreButton);

      expect(spotHandler).toHaveBeenCalledWith({ id: 4567, name: 'The bu' });
    });
  });

  describe('when the recommendation is provided with a name and no show more link flag', () => {
    it('renders a surf location recommendation including a time and forecast with a heading', () => {
      const reco = {
        swell: {
          height: 5,
          period: 12,
          direction: 'S',
        },
        wind: {
          speed: 11,
          direction: 'SW',
        },
        time: 1621983600,
        locationName: 'The bu',
        id: 4567,
        showSeeMoreLink: false,
      };

      subject(reco);

      expect(screen.getByRole('heading')).toBeInTheDocument();
      expect(screen.getByText('The bu')).toBeInTheDocument();
      expect(
        screen.getByText(
          'On Tue at 07:00 pm the swell will be 5 feet coming from the S @ 12 seconds.'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText('The wind will be 11 MPH from the SW.')
      ).toBeInTheDocument();

      expect(screen.queryByRole('link')).not.toBeInTheDocument();
      expect(screen.queryByText('See more')).not.toBeInTheDocument();
    });
  });

  describe('when the recommendation is provided without a name and show more link flag', () => {
    it('renders a surf location recommendation including a time and forecast', () => {
      const reco = {
        swell: {
          height: 5,
          period: 12,
          direction: 'S',
        },
        wind: {
          speed: 11,
          direction: 'SW',
        },
        time: 1621983600,
        id: 4567,
        showSeeMoreLink: false,
      };

      subject(reco);

      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      expect(
        screen.getByText(
          'On Tue at 07:00 pm the swell will be 5 feet coming from the S @ 12 seconds.'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText('The wind will be 11 MPH from the SW.')
      ).toBeInTheDocument();

      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });
});
