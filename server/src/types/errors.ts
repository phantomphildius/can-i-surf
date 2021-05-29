export type ErrorCode = 'exceptional' | 'api';

interface ApiError {
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
} as Record<ErrorCode, ApiError>;
