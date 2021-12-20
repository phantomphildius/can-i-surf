import spotMap from './magic-seaweed/spots';
import { getRemoteForecast } from './magic-seaweed/api';
import { sortForecasts } from './forecast';
import { Forecast, MagicSeaweedApiError } from '../types/magic-seaweed';
import { exceptionalError } from '../constants/errors';

const { isArray } = Array;

enum ApiResponseStates {
  ERROR,
  SUCCESS,
  EMPTY,
}

const getResponseStatus = (
  apiResponse: Array<Forecast[] | MagicSeaweedApiError>
): ApiResponseStates => {
  if (apiResponse.some(hasError)) {
    return ApiResponseStates.ERROR;
  } else if (
    !hasData(apiResponse as Forecast[][]) ||
    apiResponse.some((res) => !isArray(res))
  ) {
    return ApiResponseStates.EMPTY;
  } else {
    return ApiResponseStates.SUCCESS;
  }
};

export const getBestBetLocations = async (
  location: string,
  size?: number
): Promise<Forecast[] | MagicSeaweedApiError> => {
  const numberOfRecommendations = size || 3;
  const locationForecasts = await buildForecastRequestForLocation(location);
  const status = getDeepResponseStatus(locationForecasts);

  if (status === ApiResponseStates.ERROR) {
    return locationForecasts.find(hasError) as MagicSeaweedApiError;
  } else if (status === ApiResponseStates.SUCCESS) {
    const recommendations = handleSuccessfulRecommendation(
      locationForecasts as Forecast[][]
    );
    return recommendations.slice(0, numberOfRecommendations);
  } else {
    return exceptionalError;
  }
};

const handleSuccessfulRecommendation = (
  recommendationResponse: Forecast[][]
) => {
  const topLocationForecasts = recommendationResponse.map(
    (locationForecast: Forecast[]) => locationForecast.sort(sortForecasts)[0]
  );

  return topLocationForecasts.sort(sortForecasts);
};

const hasError = (forecast: Forecast[] | MagicSeaweedApiError) =>
  !Array.isArray(forecast) && !!forecast.error_response;

const hasData = (response: Forecast[] | Forecast[][]) =>
  !!(Array.isArray(response) && response.length);

const buildForecastRequestForLocation = async (
  location: string
): Promise<Array<Forecast[] | MagicSeaweedApiError>> => {
  try {
    return await Promise.all(
      Object.keys(spotMap[location]).map(
        async (spotId) => await getRemoteForecast(spotId)
      )
    );
  } catch (_err) {
    return [exceptionalError];
  }
};
