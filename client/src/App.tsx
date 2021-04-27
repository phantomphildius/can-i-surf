import React, { useState } from 'react';
import './App.css';

import Intro from './components/Intro';
import Recommendations from './components/Recommendations';

const App: React.FC = () => {
  const [engaged, setEngaged] = useState(false);
  const advancePastIntro = () => setEngaged(!engaged);

  return (
    <div>
      <header>
        <h1>{engaged ? "Let's find out!" : 'Can i surf today?'}</h1>
      </header>
      <main>
        {engaged ? (
          <Recommendations />
        ) : (
          <Intro clickHandler={advancePastIntro} />
        )}
      </main>
    </div>
  );
};

export default App;
