import { MagicSeaweedApiError } from '.';

export const exceptionalError: MagicSeaweedApiError = {
  error_response: {
    code: 500,
    error_msg: 'Something is exceptionally wrong',
  },
};
