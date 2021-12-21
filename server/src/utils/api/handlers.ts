import { Response } from 'express';

import { errorTypes, ApiError } from '../../types';
import { MagicSeaweedApiError } from '../../types';

export const parameterErrorHandler = (response: Response) => {
  const { parameter: parameterError } = errorTypes;
  return response.status(parameterError.code).json(parameterError);
};

export const responseHandler = <ResponseData, ResponseShape = {}>(
  data: ResponseData[] | MagicSeaweedApiError,
  response: Response,
  onSuccess?: (data: ResponseData[]) => ResponseShape[]
) => {
  if (!Array.isArray(data) && !!data?.error_response) {
    return onError(response, data as MagicSeaweedApiError);
  } else {
    const formattedData = onSuccess ? onSuccess(data as ResponseData[]) : data;
    return response.status(201).json(formattedData);
  }
};

const onError = (response: Response, errorResponse: MagicSeaweedApiError) => {
  const error = fetchErrorMessage(errorResponse);
  return response.status(error.code).json(error);
};

const fetchErrorMessage = (error: MagicSeaweedApiError): ApiError => {
  const {
    error_response: { code },
  } = error;

  if (code === 501 || code === 116) {
    return errorTypes.api;
  } else {
    return errorTypes.exceptional;
  }
};
