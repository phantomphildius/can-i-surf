import axios from 'axios';
import { Forecast } from '../../types/magic-seaweed';

const baseURL = `https://magicseaweed.com/api/${process.env.magic_seaweed_api_key}`;
const units = 'us';
const apiInstance = axios.create({ baseURL });

export const getForecast = (spot_id: number) => {
  return apiInstance.get<Forecast>('/forecast', {
    params: {
      spot_id,
      units,
    },
  });
};
