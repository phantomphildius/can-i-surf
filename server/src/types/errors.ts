export type ErrorCode = 'exceptional' | 'api' | 'parameter';

export interface ApiError {
  code: number;
  details: string;
}

export default {
  exceptional: {
    code: 500,
    details: 'Close out. Something unforecasted happened. Try again later.',
  },
  api: {
    code: 400,
    details:
      'Kinda like using the wrong fin box, some data is mismatched. Try again later.',
  },
  parameter: {
    code: 422,
    details: "Forgot to wax your board. You're missing something!",
  },
} as Record<ErrorCode, ApiError>;
