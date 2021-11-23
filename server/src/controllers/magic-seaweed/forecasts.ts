import { Request, Response } from 'express';
import { getRemoteForecast } from '../../models/magic-seaweed/api';
import { Forecast } from '../../types/magic-seaweed';
import { responseHandler } from '../../utils/api/handlers';

import { parameterErrorHandler } from '../../utils/api/handlers';

export const createForecasts = async (
  request: Request<{}, {}, { spotId: string }>,
  response: Response
) => {
  const { spotId } = request.body;

  if (spotId) {
    const remoteForecast = await getRemoteForecast(spotId);

    return responseHandler<Forecast>(remoteForecast, response);
  } else {
    return parameterErrorHandler(response);
  }
};
