import { Request, Response } from 'express';

import { getBestBetLocations } from '../../models/recommendation';
import { getForecastLocationNameFromId } from '../../models/forecast';
import { Forecast } from '../../types/magic-seaweed';
import errorTypes, { ErrorCode } from '../../types/errors';

export const createSpotRecommendation = async (
  request: Request,
  response: Response
) => {
  const { location } = request.body;
  if (location) {
    const bestBets = await getBestBetLocations(request.body.location, 3);

    if (bestBets === undefined) {
      return onError('exceptional', response);
    } else if (!Array.isArray(bestBets) && !!bestBets?.error_response) {
      return onError('api', response);
    } else {
      // @ts-ignore
      return onSuccess(bestBets, response);
    }
  } else {
    return onError('parameter', response);
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

const onError = (type: ErrorCode, response: Response) => {
  const { [type]: error } = errorTypes;
  return response.status(error.code).json(error);
};
