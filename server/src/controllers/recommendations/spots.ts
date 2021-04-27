import { Request, Response } from 'express';
import { getBestBetLocations } from '../../models/recommendation';
import {
  unixTimeToDate,
  getForecastLocationNameFromId,
} from '../../models/forecast';

export const createSpotRecommendation = async (
  request: Request,
  response: Response
) => {
  const bestBets = await getBestBetLocations(
    request.body.location || 'rhodeIsland',
    3
  );
  const recommendation = bestBets.map(
    ({ localTimestamp, id, solidRating }) => ({
      recommendationTime: unixTimeToDate(localTimestamp),
      recommendationLocationName: getForecastLocationNameFromId(id),
      recommendationRating: solidRating,
    })
  );

  return response.status(201).json(recommendation);
};
