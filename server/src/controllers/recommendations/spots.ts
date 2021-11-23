import { Request, Response } from 'express';

import { getBestBetLocations } from '../../models/recommendation';
import { getForecastLocationNameFromId } from '../../models/forecast';
import { Forecast, MagicSeaweedApiError } from '../../types/magic-seaweed';
import errorTypes, { ApiError, ErrorCode } from '../../types/errors';

export const createSpotRecommendation = async (
  request: Request<{}, {}, { location: string }>,
  response: Response
) => {
  const { location } = request.body;

  if (location) {
    const bestBets = await getBestBetLocations(location, 3);

    if (!Array.isArray(bestBets) && !!bestBets?.error_response) {
      return onError(response, bestBets);
    } else {
      return onSuccess(bestBets as Forecast[], response);
    }
  } else {
    return onError(response);
  }
};

const onSuccess = (bestBets: Forecast[], response: Response) => {
  const recommendation = bestBets.map(
    ({ localTimestamp, id, solidRating }) => ({
      recommendationTime: localTimestamp,
      recommendationLocationName: getForecastLocationNameFromId(id),
      recommendationRating: solidRating,
      id,
    })
  );

  return response.status(201).json(recommendation);
};

const onError = (response: Response, errorResponse?: MagicSeaweedApiError) => {
  const error =
    (errorResponse && buildErrorMessage(errorResponse)) || errorTypes.parameter;
  return response.status(error.code).json(error);
};

const buildErrorMessage = (error: MagicSeaweedApiError): ApiError => {
  const {
    error_response: { code },
  } = error;

  if (code === 501 || code === 116) {
    return errorTypes.api;
  } else {
    return errorTypes.exceptional;
  }
};
