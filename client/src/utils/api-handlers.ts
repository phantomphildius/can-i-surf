import { ApiError } from '../data';

export const hasError = (errors: ApiError | {}) =>
  Object.keys(errors).length > 0;

export function hasData<Response = {}>(response: Response) {
  return Object.keys(response).length > 0;
}
