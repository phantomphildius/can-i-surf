import React from 'react';

const Intro: React.FC<{ clickHandler: () => void }> = ({ clickHandler }) => (
  <section>
    <button onClick={clickHandler}>Start</button>
  </section>
);

export default Intro;
