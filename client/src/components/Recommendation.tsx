import React from 'react';
import dayjs from 'dayjs';
import { Link, useParams } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Paragraph,
} from 'grommet';

import { Recommendation as IRecommendation } from '../data';
interface Props extends Omit<IRecommendation, 'recommendationLocationName'> {
  id: number;
  recommendationLocationName?: string;
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
}) => {
  const { spotId } = useParams<{ spotId: string }>();
  const hasMoreDetails = spotId && spotId !== id.toString();

  return (
    <Card
      pad="medium"
      data-testid={`recommendation-${recommendationLocationName}`}
    >
      {recommendationLocationName && (
        <CardHeader>
          <Heading level="3">{recommendationLocationName}</Heading>
        </CardHeader>
      )}
      <CardBody>
        <Paragraph>
          Will be a {recommendationRating}/5 stars on{' '}
          {unixTimeToDisplayTime(recommendationTime)}
        </Paragraph>
      </CardBody>
      {hasMoreDetails && (
        <CardFooter>
          <Link to={`${id}`}>See more</Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default Recommendation;
