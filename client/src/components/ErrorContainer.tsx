import React from 'react';
import { ApiError } from '../data';

const ErrorContainer: React.FC<{ errors: ApiError }> = ({ errors }) => {
  return (
    <div>
      <p>{errors.details}</p>
    </div>
  );
};

export default ErrorContainer;
