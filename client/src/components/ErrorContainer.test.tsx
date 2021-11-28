import { render, screen } from '@testing-library/react';
import ErrorContainer from './ErrorContainer';

const subject = (errorObject: { details: string; status: number }) =>
  render(<ErrorContainer errors={errorObject} />);

describe('ErrorContainer', () => {
  it('renders a given error message', () => {
    const err = { status: 401, details: 'walled out!' };

    subject(err);

    expect(screen.getByText('walled out!')).toBeInTheDocument();
  });
});
