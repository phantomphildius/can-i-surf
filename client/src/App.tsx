import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Grommet, Main } from 'grommet';

import Home from './components/Home';
import RegionalRecommendations from './components/RegionalRecommendations';
import TimeWindows from './components/TimeWindows';

const App: React.FC = () => {
  return (
    <Grommet plain>
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="spots/:region" element={<RegionalRecommendations />}>
            <Route path=":spotId" element={<TimeWindows />} />
          </Route>
        </Routes>
      </Main>
    </Grommet>
  );
};

export default App;
