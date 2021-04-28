export interface Recommendation {
  recommendationTime: Date;
  recommendationRating: number;
  id: number;
  recommendationLocationName: string;
}

export interface ApiResponse<T> {
  loading: boolean;
  data: T;
  errors: null | {};
}

type Rating = 1 | 2 | 3 | 4 | 5;

interface SwellForecast {
  components: {
    combined: {
      height: number;
      period: number;
    };
  };
}

export interface Forecast {
  localTimestamp: number;
  fadedRating: Rating;
  solidRating: Rating;
  swell: SwellForecast;
}
