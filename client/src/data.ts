export interface Recommendation {
  time: number;
  wind: WindForecast;
  swell: SwellForecast;
  id: number;
  locationName: string;
}

export interface ApiResponse<T> {
  loading: boolean;
  data: T | undefined;
  errors: ApiError | undefined;
}

type Rating = 1 | 2 | 3 | 4 | 5;

interface SwellForecast {
  height: number;
  period: number;
  direction: string;
}

interface WindForecast {
  speed: number;
  direction: string;
}
export interface ApiError {
  status: number;
  details: string;
}
