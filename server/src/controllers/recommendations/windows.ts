import { Request, Response } from 'express';

import { getBestBetWindowsForLocation } from '../../models/recommendation';
import { Forecast, Rating } from '../../types/magic-seaweed';
import {
  parameterErrorHandler,
  responseHandler,
} from '../../utils/api/handlers';

interface ResponseShape {
  recommendationTime: number;
  id: string;
  recommendationRating: Rating;
}

export const createWindowRecommendation = async (
  request: Request<{}, {}, { spotId: string }>,
  response: Response
) => {
  const { spotId } = request.body;

  if (spotId) {
    const bestBets = await getBestBetWindowsForLocation(spotId);

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
    recommendationRating: solidRating,
    id,
  }));
