import spotMap from './magic-seaweed/spots';
import { getRemoteForecast } from './magic-seaweed/api';
import { isPastForecast, sortForecasts } from './forecast';
import { Forecast, MagicSeaweedApiError } from '../types/';
import { exceptionalError } from '../constants/errors';

const { isArray } = Array;

enum ApiResponseStates {
  ERROR,
  SUCCESS,
  EMPTY,
}

const getResponseStatus = (
  apiResponse: Forecast[] | MagicSeaweedApiError
): ApiResponseStates => {
  if (hasError(apiResponse)) {
    return ApiResponseStates.ERROR;
  } else if (!hasData(apiResponse as Forecast[])) {
    return ApiResponseStates.EMPTY;
  } else {
    return ApiResponseStates.SUCCESS;
  }
};

const getDeepResponseStatus = (
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
    return recommendations
      .filter((rec) => !isPastForecast(rec))
      .filter(isWorthIt)
      .slice(0, numberOfRecommendations);
  } else {
    return exceptionalError;
  }
};

export const getBestBetWindowsForLocation = async (
  spotId: string,
  size?: number
): Promise<Forecast[] | MagicSeaweedApiError> => {
  const numberOfRecommendations = size || 3;
  const windowForecasts = await getRemoteForecast(spotId);
  const status = getResponseStatus(windowForecasts);

  if (status === ApiResponseStates.ERROR) {
    return windowForecasts as MagicSeaweedApiError;
  } else if (status === ApiResponseStates.SUCCESS) {
    const recommendations = (windowForecasts as Forecast[]).sort(sortForecasts);
    return recommendations
      .filter((rec) => !isPastForecast(rec))
      .filter(isWorthIt)
      .slice(0, numberOfRecommendations);
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

const isWorthIt = (recommendedTimeOrPlace: Forecast): boolean =>
  recommendedTimeOrPlace.solidRating >= 1;

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
