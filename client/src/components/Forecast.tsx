import React from 'react';
import { useParams } from 'react-router';

import { usePost } from '../hooks';
import { Forecast as IForecast } from '../data';
import ErrorContainer from './ErrorContainer';

const Forecast: React.FC = () => {
  const { spotId } = useParams();
  const {
    data: forecast,
    loading,
    errors,
  } = usePost<{ spotId: string }, IForecast[]>(
    '/magic_seaweed/forecasts',
    // @ts-ignore
    { spotId }
  );

  const Loader: React.FC = () => <div>Building...</div>;

  if (loading && !(forecast || errors)) {
    return <Loader />;
  }

  if (!loading && errors) {
    return <ErrorContainer errors={errors} />;
  }

  return (
    <section>
      {forecast ? (
        <ul>
          {forecast.map((f) => (
            <li
              data-testid={`forecast-${f.localTimestamp}`}
              key={f.localTimestamp}
            >
              {f.fadedRating}
            </li>
          ))}
        </ul>
      ) : (
        <div>Nothing to see for this location</div>
      )}
    </section>
  );
};

export default Forecast;
