import { Request, Response } from 'express';

import { getBestBetLocations } from '../../models/recommendation';
import { getForecastLocationNameFromId } from '../../models/forecast';
import { Forecast, Rating } from '../../types/magic-seaweed';
import { parameterErrorHandler, responseHandler } from '../../utils/api';

interface ResponseShape {
  recommendationTime: number;
  id: string;
  recommendationLocationName: string;
  recommendationRating: Rating;
}

export const createSpotRecommendation = async (
  request: Request<{}, {}, { location: string }>,
  response: Response
) => {
  const { location } = request.body;

  if (location) {
    const bestBets = await getBestBetLocations(location, 3);

    return responseHandler<Forecast, ResponseShape>(
      bestBets,
      response,
      onSuccess
    );
  } else {
    return parameterErrorHandler(response);
  }
};

const onSuccess = (bestBets: Forecast[]): ResponseShape[] =>
  bestBets.map(({ localTimestamp, id, solidRating }) => ({
    recommendationTime: localTimestamp,
    recommendationLocationName: getForecastLocationNameFromId(id),
    recommendationRating: solidRating,
    id,
  }));
