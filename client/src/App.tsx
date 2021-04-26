import React, { useEffect, useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const getForecast = async () => await fetch('/magic_seaweed/forecasts/1');
    const response = getForecast();

    console.log('andrew');
    response.then((data) => data.json()).then((json) => setForecast(json));
  }, []);

  return (
    <div>
      <header>
        <h1>Can i surf today?</h1>
      </header>
      <main>
        <h2>Let's find out</h2>
        <ul>
          {forecast &&
            forecast.map((f: any) => (
              <li key={f.timestamp}>Rating: {f.fadedRating}</li>
            ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
