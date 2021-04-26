import { Request, RequestHandler, Response } from 'express';
import { getRemoteForecast } from '../../models/magic-seaweed/api';
import { Forecast } from '../../types/magic-seaweed';
// import { Forecast } from '../../types/magic-seaweed';

export const getForecasts = async (request: Request, response: Response) => {
  const spotId = parseInt(request.params.spot_id) ?? 1;
  const remote = await getRemoteForecast(spotId);

  return response.json(remote.data);
};
