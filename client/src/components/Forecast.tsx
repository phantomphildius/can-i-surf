import React from 'react';
import { useParams } from 'react-router';

import { usePost } from '../hooks';
import { Forecast as IForecast } from '../data';

const Forecast: React.FC = () => {
  const { spotId } = useParams();
  const { data: forecast, loading } = usePost<{ spotId: string }, IForecast[]>(
    '/magic_seaweed/forecasts',
    // @ts-ignore
    { spotId }
  );

  return (
    <section>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {forecast &&
            forecast.map((f) => (
              <li key={f.localTimestamp}>{f.fadedRating}</li>
            ))}
        </ul>
      )}
    </section>
  );
};

export default Forecast;
