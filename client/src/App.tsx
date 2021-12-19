import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Grommet, Main } from 'grommet';

import Home from './components/Home';
import Recommendations from './components/Recommendations';
import Forecast from './components/Forecast';

const App: React.FC = () => {
  return (
    <Grommet plain>
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="spots/:region" element={<Recommendations />}>
            <Route path=":spotId" element={<Forecast />} />
          </Route>
        </Routes>
      </Main>
    </Grommet>
  );
};

export default App;
