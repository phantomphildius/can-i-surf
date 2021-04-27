import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Recommendation {
  recommendationTime: Date;
  recommendationRating: number;
  id: number;
  recommendationLocationName: string;
}

const Recommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const createRecommendation = async () =>
        await axios.post<
          { location: string },
          Promise<AxiosResponse<Recommendation[]>>
        >('/recommendations/spot', { location: 'rhodeIsland' });

      createRecommendation()
        .then((res) => setRecommendations(res.data))
        .catch((err) => {
          throw new Error(err);
        });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const styles = {
    flex: { display: 'flex' },
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
