import React, { useState } from 'react';

import Intro from './components/Intro';
import Recommendations from './components/Recommendations';
import Forecast from './components/Forecast';
import { Spot } from './data';

const App: React.FC = () => {
  const [stepName, setStepName] = useState('intro');
  const [recommendedSpot, setRecommendedSpot] = useState<Spot | null>(null);

  const recommendationHandler = (spot: Spot) => {
    setRecommendedSpot(spot);
    setStepName('forecast');
  };

  const spotRecommendationPhaseFactory = (stepName: string) => {
    if (stepName === 'recommendation') {
      return <Recommendations recommendationHandler={recommendationHandler} />;
    } else if (stepName === 'forecast' && recommendedSpot) {
      // make it so this isn't necessary
      return <Forecast {...recommendedSpot} />;
    } else {
      return <Intro clickHandler={() => setStepName('recommendation')} />;
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
