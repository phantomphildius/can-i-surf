import { ApiError } from '../data';

export const hasError = (errors: ApiError | {}) =>
  Object.keys(errors).length > 0;
