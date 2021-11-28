import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Recommendations from './components/Recommendations';
import Forecast from './components/Forecast';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="spots/:region" element={<Recommendations />}>
            <Route path=":spotId" element={<Forecast />} />
          </Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
