import { render, screen } from '@testing-library/react';
import { Grommet } from 'grommet';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// TODO integration test

const subject = () =>
  render(
    <Grommet plain>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Grommet>
  );

test.skip('renders learn react link', () => {
  subject();
  expect(screen.getByText('Can I Surf?')).toBeInTheDocument();
});
