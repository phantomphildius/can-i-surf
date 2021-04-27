import { spotMap } from './magic-seaweed/spots';
import { getRemoteForecast } from './magic-seaweed/api';
import { sortForecasts } from './forecast';

export const getBestBetLocations = async (location: string, size: number) => {
  const numberOfRecommendations = size || 3;
  const locationForecasts = await buildForecastRequestForLocation(location);
  const topLocationForecasts = locationForecasts.map(
    (locationForecast) => locationForecast.sort(sortForecasts)[0]
  );

  return topLocationForecasts
    .sort(sortForecasts)
    .slice(0, numberOfRecommendations);
};

const buildForecastRequestForLocation = async (location: string) =>
  await Promise.all(
    Object.keys(spotMap[location]).map(
      async (spotId) => await getRemoteForecast(spotId)
    )
  );
