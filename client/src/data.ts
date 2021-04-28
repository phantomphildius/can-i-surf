export interface Recommendation {
  recommendationTime: number;
  recommendationRating: number;
  id: number;
  recommendationLocationName: string;
}

export interface ApiResponse<T> {
  loading: boolean;
  data: T | undefined;
  errors: null | {};
}

type Rating = 1 | 2 | 3 | 4 | 5;

export interface Spot {
  spotId: number;
  spotName: string;
}

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
