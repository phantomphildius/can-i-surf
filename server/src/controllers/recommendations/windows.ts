import { Request, Response } from 'express';

import { getBestBetWindowsForLocation } from '../../models/recommendation';
import { Forecast, WindResponse, SwellResponse } from '../../types';
import {
  parameterErrorHandler,
  responseHandler,
} from '../../utils/api/handlers';

interface ResponseShape {
  time: number;
  id: string;
  wind: WindResponse;
  swell: SwellResponse;
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
  bestBets.map(({ localTimestamp, id, swell, wind }) => {
    const {
      compassDirection: swellDirection,
      height,
      period,
    } = swell.components.combined;
    const { speed, compassDirection: windDirection } = wind;

    return {
      time: localTimestamp,
      swell: {
        height,
        period,
        direction: swellDirection,
      },
      wind: {
        speed,
        direction: windDirection,
      },
      id,
    };
  });
