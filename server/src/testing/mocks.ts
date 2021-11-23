export const mockServerResponse = (): MockServerResponse => {
  const res: Partial<MockServerResponse> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as MockServerResponse;
};

interface MockServerResponse {
  status: jest.Mock;
  json: jest.Mock;
}
