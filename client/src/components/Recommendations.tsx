import React from 'react';

import Recommendation from './Recommendation';
import { usePost } from '../hooks';
import styles from '../styles';
import { Recommendation as IRecommendation, Spot } from '../data';

const Recommendations: React.FC<{
  recommendationHandler: (spot: Spot) => void;
}> = ({ recommendationHandler }) => {
  const Loader: React.FC = () => <h2>Finding out...</h2>;

  const { data: recommendations, loading } = usePost<
    { location: string },
    IRecommendation[]
  >('/recommendations/spot', { location: 'rhodeIsland' });

  if (loading && !recommendations) {
    return <Loader />;
  }

  return (
    <section>
      <h2>Best bets</h2>
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
