import React from 'react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Paragraph,
} from 'grommet';

dayjs.extend(timezone);
dayjs.extend(utc);

import { Recommendation as IRecommendation, Spot } from '../data';
export interface Props extends Omit<IRecommendation, 'locationName'> {
  id: number;
  locationName?: string;
  showSeeMoreLink: boolean;
  handleSpotSelection?: (spot: Spot) => void;
}

export const unixTimeToDisplayTime = (unixTimeStamp: number): string => {
  const dateObject = dayjs.tz(unixTimeStamp * 1000, 'America/New_York');
  return `${dateObject.format('ddd')} at ${dateObject.format('hh:mm a')}`;
};

const Recommendation: React.FC<Props> = ({
  id,
  time,
  locationName,
  swell,
  wind,
  showSeeMoreLink,
  handleSpotSelection,
}) => {
  return (
    <Card pad="medium" data-testid={`recommendation-${locationName || time}`}>
      {locationName && (
        <CardHeader>
          <Heading level="3">{locationName}</Heading>
        </CardHeader>
      )}
      <CardBody>
        <Paragraph fill>
          On {unixTimeToDisplayTime(time)} the swell will be {swell.height} feet
          coming from the {swell.direction} @ {swell.period} seconds.
        </Paragraph>
        <Paragraph fill>
          The wind will be {wind.speed} MPH from the {wind.direction}.
        </Paragraph>
      </CardBody>
      {showSeeMoreLink && handleSpotSelection && (
        <CardFooter>
          <Button
            onClick={() =>
              handleSpotSelection({ id, name: locationName as string })
            }
          >
            See more
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default Recommendation;
