import React from 'react';

import Recommendation from './Recommendation';
import { usePost } from '../hooks';
import styles from '../styles';
import { Recommendation as IRecommendation, Spot } from '../data';

interface Props {
  recommendationHandler: (spot: Spot, spotTime: number) => void;
  recommendationRegion: string;
}

const Recommendations: React.FC<Props> = ({
  recommendationHandler,
  recommendationRegion,
}) => {
  const Loader: React.FC = () => <h2>Finding out...</h2>;

  const { data: recommendations, loading } = usePost<
    { location: string },
    IRecommendation[]
  >('/recommendations/spot', { location: recommendationRegion });

  if (loading && !recommendations) {
    return <Loader />;
  }

  return (
    <section>
      <h2>Best bets for {recommendationRegion}</h2>
      <div style={styles.flex}>
        {recommendations ? (
          recommendations.map((rec) => (
            <Recommendation
              key={rec.id}
              selectionHandler={recommendationHandler}
              {...rec}
            />
          ))
        ) : (
          <h3>Guess not! Bummer dude</h3>
        )}
      </div>
    </section>
  );
};

export default Recommendations;
