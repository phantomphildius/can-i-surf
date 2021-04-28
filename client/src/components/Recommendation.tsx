import React from 'react';
import dayjs from 'dayjs';

import { Recommendation as IRecommendation, Spot } from '../data';
import styles from '../styles';

interface Props extends IRecommendation {
  selectionHandler: (spot: Spot, spotTime: number) => void;
}

export const unixTimeToDisplayTime = (unixTimeStamp: number): string => {
  const dateObject = dayjs(unixTimeStamp * 1000);
  return `${dateObject.format('ddd')} at ${dateObject.format('hh:mm a')}`;
};

const Recommendation: React.FC<Props> = ({
  recommendationRating,
  recommendationTime,
  recommendationLocationName,
  selectionHandler,
  id,
}) => (
  <div style={styles.border}>
    <h3>{recommendationLocationName}</h3>
    <p>
      Will be a {recommendationRating}/5 stars on{' '}
      {unixTimeToDisplayTime(recommendationTime)}
    </p>
    <button
      onClick={() =>
        selectionHandler(
          { spotId: id, spotName: recommendationLocationName },
          recommendationTime
        )
      }
    >
      See more
    </button>
  </div>
);

export default Recommendation;
