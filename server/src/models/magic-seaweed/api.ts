import axios from 'axios';
import { Forecast } from '../../types/magic-seaweed';

const baseURL = `https://magicseaweed.com/api/${process.env.magic_seaweed_api_key}`;
const units = 'us';
const fields =
  'fadedRating,solidRating,swell.components.combined.height,swell.components.combined.period,localTimestamp';
const baseParams = { units, fields };
const apiInstance = axios.create({ baseURL });

export const getRemoteForecast = async (
  spotId: string
): Promise<Forecast[]> => {
  const params = { spot_id: spotId, ...baseParams };
  const response = await apiInstance.get<Omit<Forecast, 'id'>[]>('/forecast', {
    params,
  });

  // needs to be some sort of error handling
  return response.data.map((forecast) => ({ id: spotId, ...forecast }));
};
