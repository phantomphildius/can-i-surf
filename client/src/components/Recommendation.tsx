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

import { Recommendation as IRecommendation, Spot } from '../data';
import { useBreakpoint } from '../hooks';

dayjs.extend(timezone);
dayjs.extend(utc);
export interface Props extends Omit<IRecommendation, 'locationName'> {
  id: number;
  locationName?: string;
  isActive: boolean;
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
  isActive,
  handleSpotSelection,
}) => {
  const size = useBreakpoint();
  const isNotLargeScreen = size !== 'large';

  return (
    <Card
      pad={{ horizontal: 'medium', bottom: 'medium' }}
      data-testid={`recommendation-${locationName || time}`}
      border={{ color: 'navy' }}
      background="cream"
    >
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
      {handleSpotSelection && (
        <CardFooter>
          <Button
            fill={isNotLargeScreen && 'horizontal'}
            primary
            active={isActive}
            onClick={() => {
              handleSpotSelection({ id, name: locationName as string });
            }}
            label="See more"
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default Recommendation;
