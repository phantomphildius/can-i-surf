import React from 'react';

const Intro: React.FC<{ clickHandler: (location: string) => void }> = ({
  clickHandler,
}) => (
  <section>
    <h2>Choose a region to start</h2>
    <button onClick={() => clickHandler('Rhode Island')}>Rhode Island</button>
    <button onClick={() => clickHandler('Hamptons')}>Hamptons</button>
  </section>
);

export default Intro;
