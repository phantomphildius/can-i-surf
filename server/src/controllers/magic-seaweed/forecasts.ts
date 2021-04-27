import { Request, Response } from 'express';
import { getRemoteForecast } from '../../models/magic-seaweed/api';

export const getForecasts = async (request: Request, response: Response) => {
  const spotId = parseInt(request.params.spot_id) ?? 1;
  const remote = await getRemoteForecast(spotId);

  return response.json(remote);
};
