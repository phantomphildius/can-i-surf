import React from 'react';
import { Recommendation } from '../data';
import { useRecommendation } from '../hooks/recommendations';

const Recommendations: React.FC = () => {
  const styles = {
    flex: { display: 'flex', flexDirection: 'column' },
    border: { border: '1px solid black' },
  } as const;

  const Recommendation: React.FC<Recommendation> = ({
    recommendationRating,
    recommendationTime,
    recommendationLocationName,
  }) => (
    <div style={styles.border}>
      <h3>{recommendationLocationName}</h3>
      <p>
        Will be a {recommendationRating}/5 stars at {recommendationTime}
      </p>
    </div>
  );

  const Loader: React.FC = () => <div>Loading...</div>;

  const { data: recommendations, loading } = useRecommendation('rhodeIsland');

  if (loading && !recommendations.length) {
    return <Loader />;
  }

  return (
    <section>
      <div style={styles.flex}>
        {recommendations.length ? (
          recommendations.map((rec) => <Recommendation key={rec.id} {...rec} />)
        ) : (
          <h3>Guess not! Bummer dude</h3>
        )}
      </div>
    </section>
  );
};

export default Recommendations;
