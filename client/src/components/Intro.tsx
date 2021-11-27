import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Intro: React.FC = () => (
  <>
    <section>
      <h2>Choose a region to start</h2>
      <Link to="/spots/rhode-island">Rhode Island</Link>
      <Link to="/spots/hamptons">Hamptons</Link>
    </section>
    <Outlet />
  </>
);

export default Intro;
