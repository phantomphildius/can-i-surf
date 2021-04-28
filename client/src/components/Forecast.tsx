import React from 'react';

import { usePost } from '../hooks';
import { Forecast as IForecast, Spot } from '../data';

interface Props {
  spot: Spot;
  time: number;
}

const Forecast: React.FC<Props> = ({ spot, time }) => {
  const { spotId, spotName } = spot;
  const { data: forecast, loading } = usePost<
    { spotId: number; time: number },
    IForecast[]
  >('/magic_seaweed/forecasts', { spotId: spotId, time });

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
