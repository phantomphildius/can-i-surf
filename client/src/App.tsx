import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Intro from './components/Intro';
import Recommendations from './components/Recommendations';
import Forecast from './components/Forecast';

const App: React.FC = () => {
  return (
    <div>
      <header>
        <h1>Let's find out!</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Intro />}>
            <Route path="spots/:region" element={<Recommendations />}>
              <Route path=":spotId" element={<Forecast />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
