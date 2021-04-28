import { Request, Response } from 'express';
import { getRemoteForecast } from '../../models/magic-seaweed/api';

export const createForecasts = async (request: Request, response: Response) => {
  const { spotId } = request.body; // wtf
  const remote = await getRemoteForecast(spotId);

  return response.json(remote);
};
