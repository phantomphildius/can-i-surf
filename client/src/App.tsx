import React, { useState } from 'react';

import Intro from './components/Intro';
import Recommendations from './components/Recommendations';
import Forecast from './components/Forecast';
import { Spot } from './data';

const App: React.FC = () => {
  const [stepName, setStepName] = useState('intro');
  const [recommendationRegion, setRecommendationRegion] = useState<string>('');
  const [recommendedSpot, setRecommendedSpot] = useState<Spot | null>(null);
  const [recommendedTime, setRecommendedTime] = useState<number>(0);

  const recommendationHandler = (spot: Spot, spotTime: number) => {
    setRecommendedSpot(spot);
    setRecommendedTime(spotTime);
    setStepName('forecast');
  };
  const introHandler = (location: string) => {
    setRecommendationRegion(location);
    setStepName('recommendation');
  };

  const spotRecommendationPhaseFactory = (stepName: string) => {
    if (stepName === 'recommendation' && recommendationRegion) {
      return (
        <Recommendations
          recommendationHandler={recommendationHandler}
          recommendationRegion={recommendationRegion}
        />
      );
    } else if (stepName === 'forecast' && recommendedSpot) {
      // make it so this isn't necessary ^ and think about a provider maybe or react-router
      return <Forecast spot={recommendedSpot} time={recommendedTime} />;
    } else {
      return <Intro clickHandler={introHandler} />;
    }
  };

  return (
    <div>
      <header>
        <h1>Let's find out!</h1>
      </header>
      <main>{spotRecommendationPhaseFactory(stepName)}</main>
    </div>
  );
};

export default App;
