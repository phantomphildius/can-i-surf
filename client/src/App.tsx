import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Grommet, Main } from 'grommet';

import Home from './components/Home';
import RegionalRecommendations from './components/RegionalRecommendations';
import theme from './theme';

const App: React.FC = () => {
  return (
    <Grommet theme={theme}>
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="spots/:region" element={<RegionalRecommendations />} />
        </Routes>
      </Main>
    </Grommet>
  );
};

export default App;
