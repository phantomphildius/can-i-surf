import React from 'react';

import { usePost } from '../hooks';
import { Forecast as IForecast, Spot } from '../data';

const Forecast: React.FC<Spot> = ({ spotId, spotName }) => {
  const { data: forecast, loading } = usePost<
    { spotId: number; time: string },
    IForecast[]
  >('/magic_seaweed/forecasts', { spotId: spotId, time: 'time' });

  return (
    <section>
      <h2>{spotName}</h2>
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
