import { spotMap } from './magic-seaweed/spots';
import { getRemoteForecast } from './magic-seaweed/api';
import { sortForecasts } from './forecast';
import { Forecast } from '../types/magic-seaweed';

export const getBestBetLocations = async (
  location: string,
  size: number
): Promise<Forecast[]> => {
  const numberOfRecommendations = size || 3;
  const locationForecasts = await buildForecastRequestForLocation(location);
  const topLocationForecasts = locationForecasts.map(
    (locationForecast: Forecast[]) => locationForecast.sort(sortForecasts)[0]
  );

  return topLocationForecasts
    .sort(sortForecasts)
    .slice(0, numberOfRecommendations);
};

const buildForecastRequestForLocation = async (
  location: string
): Promise<Forecast[][]> =>
  await Promise.all(
    Object.keys(spotMap[location]).map(
      async (spotId) => await getRemoteForecast(spotId)
    )
  );
