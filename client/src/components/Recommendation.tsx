import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Paragraph,
} from 'grommet';

import { Recommendation as IRecommendation } from '../data';
export interface Props extends Omit<IRecommendation, 'locationName'> {
  id: number;
  locationName?: string;
  showSeeMoreLink: boolean;
}

export const unixTimeToDisplayTime = (unixTimeStamp: number): string => {
  const dateObject = dayjs(unixTimeStamp * 1000);
  return `${dateObject.format('ddd')} at ${dateObject.format('hh:mm a')}`;
};

const Recommendation: React.FC<Props> = ({
  time,
  locationName,
  id,
  showSeeMoreLink,
  swell,
  wind,
}) => {
  return (
    <Card pad="medium" data-testid={`recommendation-${locationName}`}>
      {locationName && (
        <CardHeader>
          <Heading level="3">{locationName}</Heading>
        </CardHeader>
      )}
      <CardBody>
        <Paragraph>
          On {unixTimeToDisplayTime(time)} the swell will be {swell.height} feet
          coming from the {swell.direction} @ {swell.period} seconds.
        </Paragraph>
        <Paragraph>
          The wind will be {wind.speed} MPH from the {wind.direction}.
        </Paragraph>
      </CardBody>
      {showSeeMoreLink && (
        <CardFooter>
          <Link to={`${id}`}>See more</Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default Recommendation;
