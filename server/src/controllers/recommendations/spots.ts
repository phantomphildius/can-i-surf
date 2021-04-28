import { Request, Response } from 'express';
import { getBestBetLocations } from '../../models/recommendation';
import {
  unixTimeToWeekDay,
  unixTimeToTime,
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
      recommendationWeekDay: unixTimeToWeekDay(localTimestamp),
      recommendationTime: unixTimeToTime(localTimestamp),
      recommendationLocationName: getForecastLocationNameFromId(id),
      recommendationRating: solidRating,
      id,
    })
  );

  return response.status(201).json(recommendation);
};
