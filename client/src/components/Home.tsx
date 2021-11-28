import React from 'react';
import { Link } from 'react-router-dom';

const Intro: React.FC = () => (
  <>
    <section>
      <h2>Let's find out! Choose a region to start</h2>
      <Link to="/spots/rhode-island">Rhode Island</Link>
      <Link to="/spots/hamptons">Hamptons</Link>
    </section>
  </>
);

export default Intro;
