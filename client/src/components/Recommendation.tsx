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
export interface Props extends IRecommendation {
  id: number;
}

export const unixTimeToDisplayTime = (unixTimeStamp: number): string => {
  const dateObject = dayjs(unixTimeStamp * 1000);
  return `${dateObject.format('ddd')} at ${dateObject.format('hh:mm a')}`;
};

const Recommendation: React.FC<Props> = ({
  recommendationRating,
  recommendationTime,
  recommendationLocationName,
  id,
}) => (
  <Card
    pad="medium"
    data-testid={`recommendation-${recommendationLocationName}`}
  >
    <CardHeader>
      <Heading level="3">{recommendationLocationName}</Heading>
    </CardHeader>
    <CardBody>
      <Paragraph>
        Will be a {recommendationRating}/5 stars on{' '}
        {unixTimeToDisplayTime(recommendationTime)}
      </Paragraph>
    </CardBody>
    <CardFooter>
      <Link to={`${id}`}>See more</Link>
    </CardFooter>
  </Card>
);

export default Recommendation;
