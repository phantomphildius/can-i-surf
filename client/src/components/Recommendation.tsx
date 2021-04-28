import React from 'react';

import { Recommendation as IRecommendation, Spot } from '../data';
import styles from '../styles';

interface Props extends IRecommendation {
  selectionHandler: (spot: Spot) => void;
}

const Recommendation: React.FC<Props> = ({
  recommendationRating,
  recommendationTime,
  recommendationWeekDay,
  recommendationLocationName,
  selectionHandler,
  id,
}) => (
  <div style={styles.border}>
    <h3>{recommendationLocationName}</h3>
    <p>
      Will be a {recommendationRating}/5 stars on {recommendationWeekDay} at{' '}
      {recommendationTime}
    </p>
    <button
      onClick={() =>
        selectionHandler({ spotId: id, spotName: recommendationLocationName })
      }
    >
      See more
    </button>
  </div>
);

export default Recommendation;
