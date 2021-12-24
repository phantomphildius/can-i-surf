import { Response, Request } from 'express';

import { getLocations } from '../../models/magic-seaweed/spots';

export const getRecommendationLocations = (
  _request: Request,
  response: Response
) => {
  const locations = getLocations();
  return response.status(200).json(locations);
};
