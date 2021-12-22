import { Request, Response } from 'express';

import { getBestBetLocations } from '../../models/recommendation';
import { getForecastLocationNameFromId } from '../../models/forecast';
import { Forecast, WindResponse, SwellResponse } from '../../types';
import {
  parameterErrorHandler,
  responseHandler,
} from '../../utils/api/handlers';

interface ResponseShape {
  time: number;
  id: string;
  locationName: string;
  wind: WindResponse;
  swell: SwellResponse;
}

export const createSpotRecommendation = async (
  request: Request<{}, {}, { location: string }>,
  response: Response
) => {
  const { location } = request.body;

  if (location) {
    const bestBets = await getBestBetLocations(location);

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
      locationName: getForecastLocationNameFromId(id),
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
