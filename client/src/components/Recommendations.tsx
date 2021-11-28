import React from 'react';
import { Outlet, useParams } from 'react-router';
import camelCase from 'lodash.camelcase';

import Recommendation from './Recommendation';
import { usePost } from '../hooks';
import styles from '../styles';
import { Recommendation as IRecommendation } from '../data';

const Recommendations: React.FC = () => {
  const Loader: React.FC = () => <h2>Finding out...</h2>;
  const { region: location } = useParams();

  const {
    data: recommendations,
    loading,
    errors,
  } = usePost<{ location: string }, IRecommendation[]>(
    '/recommendations/spot',
    { location: camelCase(location) }
  );

  if (loading && !(recommendations || errors)) {
    return <Loader />;
  }

  return (
    <section>
      <h2>Best bets are</h2>
      {recommendations && !errors ? (
        <div style={styles.flex.default}>
          <section>
            <div style={styles.flex.column}>
              {recommendations.map((rec) => (
                <Recommendation key={rec.id} {...rec} />
              ))}
            </div>
          </section>
          <section>
            <Outlet />
          </section>
        </div>
      ) : (
        <>
          <h3>Guess not! Bummer dude</h3>
          <p>{errors?.details}</p>
        </>
      )}
    </section>
  );
};

export default Recommendations;
