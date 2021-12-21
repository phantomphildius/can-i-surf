import axios from 'axios';

import { exceptionalError } from '../../constants/errors';
import { Forecast, MagicSeaweedApiError } from '../../types/magic-seaweed';

const baseURL = `https://magicseaweed.com/api/${process.env.magic_seaweed_api_key}`;
const units = 'us';
const fields =
  'fadedRating,solidRating,swell.components.combined.height,swell.components.combined.period,swell.components.combined.compassDirection,localTimestamp,wind.speed,wind.compassDirection';
const baseParams = { units, fields };
const apiInstance = axios.create({ baseURL });

export const getRemoteForecast = async (
  spotId: string
): Promise<Forecast[] | MagicSeaweedApiError> => {
  const params = { spot_id: spotId, ...baseParams };
  try {
    const response = await apiInstance.get<
      Omit<Forecast, 'id'>[] | MagicSeaweedApiError
    >('/forecast', {
      params,
    });

    if (response.status !== 200) {
      return exceptionalError;
    }

    if (Array.isArray(response.data)) {
      return response.data.map((forecast) => ({ id: spotId, ...forecast }));
    } else {
      return response.data;
    }
  } catch (_err) {
    return exceptionalError;
  }
};
