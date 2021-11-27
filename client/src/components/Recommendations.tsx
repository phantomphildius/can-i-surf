import React from 'react';
import { Outlet, useParams } from 'react-router';
import camelCase from 'lodash.camelcase';

import Recommendation from './Recommendation';
import { usePost } from '../hooks';
import styles from '../styles';
import { Recommendation as IRecommendation } from '../data';
import { hasError } from '../utils';

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

  if (loading && !(recommendations || hasError(errors))) {
    return <Loader />;
  }

  return (
    <section>
      {recommendations && !hasError(errors) ? (
        <>
          <h2>Best bets for {location}</h2>
          <div style={styles.flex}>
            {recommendations.map((rec) => (
              <Recommendation key={rec.id} {...rec} />
            ))}
          </div>
          <Outlet />
        </>
      ) : (
        <>
          <h3>Guess not! Bummer dude</h3>
          {/* @ts-ignore */}
          <p>{Object.keys(errors).length && errors.details}</p>
        </>
      )}
    </section>
  );
};

export default Recommendations;
