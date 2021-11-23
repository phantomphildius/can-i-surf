import { parameterErrorHandler, responseHandler } from './handlers';
import { mockServerResponse } from '../../testing';

describe('Api utils', () => {
  describe('parameterErrorHandler', () => {
    it('returns a 422 error object', () => {
      const mockResponse = mockServerResponse() as any;

      parameterErrorHandler(mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          code: 422,
          details: "Forgot to wax your board. You're missing something!",
        })
      );
    });
  });

  describe('responseHandler', () => {
    describe('when the remote api returns a known error', () => {
      it('returns a 400 error for a parameter error', () => {
        const mockResponse = mockServerResponse() as any;
        const errorObject = {
          error_response: {
            code: 501,
            error_msg: 'Something about incorrect parameters',
          },
        };

        responseHandler(errorObject, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith(
          expect.objectContaining({
            code: 400,
            details:
              'Kinda like using the wrong fin box, some data is mismatched. Try again later.',
          })
        );
      });

      it('returns a 400 error for an auth error', () => {
        const mockResponse = mockServerResponse() as any;
        const errorObject = {
          error_response: {
            code: 116,
            error_msg: 'bad token',
          },
        };

        responseHandler(errorObject, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith(
          expect.objectContaining({
            code: 400,
            details:
              'Kinda like using the wrong fin box, some data is mismatched. Try again later.',
          })
        );
      });
    });

    describe('When something goes exceptionally wrong', () => {
      it('returns a 500 error', () => {
        const mockResponse = mockServerResponse() as any;
        const errorObject = {
          error_response: {
            code: 500,
            error_msg: 'Something went exceptionally wrong',
          },
        };

        responseHandler(errorObject, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith(
          expect.objectContaining({
            code: 500,
            details:
              'Close out. Something unforecasted happened. Try again later.',
          })
        );
      });
    });

    describe('Success states', () => {
      describe('With a formatter', () => {
        it('returns the formatted response', () => {
          const mockResponse = mockServerResponse() as any;
          const dataObject = [
            {
              id: 'one',
              name: 'obie',
            },
            {
              id: 'one',
              name: 'dog',
            },
          ];

          const formatter = (
            data: { name: string; id: string }[]
          ): { name: string; id: string }[] => {
            return data.map((obj) => ({
              ...obj,
              name: obj.name.toUpperCase(),
            }));
          };

          responseHandler<{ id: string; name: string }>(
            dataObject,
            mockResponse,
            formatter
          );

          expect(mockResponse.status).toHaveBeenCalledWith(201);
          expect(mockResponse.json).toHaveBeenCalledWith(formatter(dataObject));
        });
      });

      describe('Without a formatter', () => {
        it('returns the raw response', () => {
          const mockResponse = mockServerResponse() as any;
          const dataObject = [
            {
              id: 'one',
              name: 'obie',
            },
            {
              id: 'one',
              name: 'dog',
            },
          ];

          responseHandler<{ id: string; name: string }>(
            dataObject,
            mockResponse
          );

          expect(mockResponse.status).toHaveBeenCalledWith(201);
          expect(mockResponse.json).toHaveBeenCalledWith(dataObject);
        });
      });
    });
  });
});
