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
  id: string;
  localTimestamp: number;
  fadedRating: Rating;
  solidRating: Rating;
  swell: SwellForecast;
}
