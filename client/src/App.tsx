import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Grommet, Main } from 'grommet';

import theme from './theme';
import Home from './components/Home';
import RegionalRecommendations from './components/RegionalRecommendations';
import About from './components/About';

const App: React.FC = () => {
  return (
    <Grommet theme={theme}>
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="spots/:region" element={<RegionalRecommendations />} />
          <Route path="about" element={<About />} />
        </Routes>
      </Main>
    </Grommet>
  );
};

export default App;
