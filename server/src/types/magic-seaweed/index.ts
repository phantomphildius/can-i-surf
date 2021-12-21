export type Rating = 1 | 2 | 3 | 4 | 5;

export interface SwellForecast {
  components: {
    combined: {
      height: number;
      period: number;
      compassDirection: string;
    };
  };
}

interface WindForecast {
  speed: number;
  compassDirection: string;
}

export interface Forecast {
  id: string;
  localTimestamp: number;
  fadedRating: Rating;
  solidRating: Rating;
  swell: SwellForecast;
  wind: WindForecast;
}

export interface MagicSeaweedApiError {
  error_response: {
    code: number;
    error_msg: string;
  };
}
