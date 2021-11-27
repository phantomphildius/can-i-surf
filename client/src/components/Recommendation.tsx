import React from 'react';
import dayjs from 'dayjs';

import { Recommendation as IRecommendation } from '../data';
import styles from '../styles';
import { Link } from 'react-router-dom';

interface Props extends IRecommendation {
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
  <div style={styles.border}>
    <h3>{recommendationLocationName}</h3>
    <p>
      Will be a {recommendationRating}/5 stars on{' '}
      {unixTimeToDisplayTime(recommendationTime)}
    </p>
    <Link to={`${id}`}>See more</Link>
  </div>
);

export default Recommendation;
