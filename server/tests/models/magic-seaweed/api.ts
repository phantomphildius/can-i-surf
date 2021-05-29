var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath });

import { expect } from 'chai';
import nock from 'nock';
import sinon from 'sinon';

import { getRemoteForecast } from '../../../src/models/magic-seaweed/api';

describe('Api', () => {
  afterEach(() => {
    nock.cleanAll();
    sinon.restore();
  });

  describe('#getRemoteForecast', function () {
    describe('Magic seaweed errors', function () {
      describe('when there is an invalid parameter', function () {
        it('returns the error', async function () {
          const mockedRequest = nock(
            `https://magicseaweed.com/api/${process.env.magic_seaweed_api_key}`
          )
            .get('/forecast')
            .query({
              units: 'us',
              fields:
                'fadedRating,solidRating,swell.components.combined.height,swell.components.combined.period,localTimestamp',
              spot_id: 'locals-only',
            })
            .reply(200, {
              error_response: {
                code: 501,
                error_msg:
                  'Invalid parameters were supplied and did not pass our validation, please double check your request.',
              },
            });

          // @ts-ignore
          const response = await getRemoteForecast('locals-only');
          // @ts-ignore
          expect(response.error_response.code).to.eql(501);
          // @ts-ignore
          expect(response.error_response.error_msg).to.eql(
            'Invalid parameters were supplied and did not pass our validation, please double check your request.'
          );
          mockedRequest.isDone();
        });
      });

      describe('when the api key is invalid', function () {
        before(() => {
          const fakeEnv = sinon.stub();
          sinon.stub(process.env, 'magic_seaweed_api_key').callsFake(fakeEnv);
        });

        it('returns the error', async function () {
          const mockedRequest = nock(`https://magicseaweed.com/api/fraudster`)
            .get('/forecast')
            .query({
              units: 'us',
              fields:
                'fadedRating,solidRating,swell.components.combined.height,swell.components.combined.period,localTimestamp',
              spot_id: '2807',
            })
            .reply(200, {
              error_response: {
                code: 116,
                error_msg:
                  'Unable to authenticate request: API key is invalid.',
              },
            });

          // @ts-ignore
          const response = await getRemoteForecast('2807');
          // @ts-ignore
          expect(response.error_response.code).to.eql(116);
          // @ts-ignore
          expect(response.error_response.error_msq).to.eql(
            'Unable to authenticate request: API key is invalid.'
          );

          mockedRequest.isDone();
        });
      });
    });

    describe('Network errors', function () {
      it('returns the error', async function () {
        const mockedRequest = nock(
          `https://magicseaweed.com/api/${process.env.magic_seaweed_api_key}`
        )
          .get('/forecast')
          .query({
            units: 'us',
            fields:
              'fadedRating,solidRating,swell.components.combined.height,swell.components.combined.period,localTimestamp',
            spot_id: '2807',
          })
          .reply(500, { error: 'something went wrong!' });

        const response = await getRemoteForecast('2807');
        expect(response).to.throw;

        mockedRequest.isDone();
      });
    });
    describe('when the the request is successful', function () {
      it('returns an array of forecast objects', async function () {
        const mockedRequest = nock(
          `https://magicseaweed.com/api/${process.env.magic_seaweed_api_key}`
        )
          .get('/forecast')
          .query({
            units: 'us',
            fields:
              'fadedRating,solidRating,swell.components.combined.height,swell.components.combined.period,localTimestamp',
            spot_id: '2807',
          })
          .reply(200, [
            {
              timestamp: 1621983600,
              solidRating: 0,
              swell: {
                components: {
                  combined: {
                    height: 5.5,
                    period: 9,
                  },
                },
              },
            },
            {
              timestamp: 1621983601,
              solidRating: 0,
              swell: {
                components: {
                  combined: {
                    height: 5.5,
                    period: 9,
                  },
                },
              },
            },
            {
              timestamp: 1621983602,
              solidRating: 0,
              swell: {
                components: {
                  combined: {
                    height: 5.5,
                    period: 9,
                  },
                },
              },
            },
            {
              timestamp: 1621983603,
              solidRating: 0,
              swell: {
                components: {
                  combined: {
                    height: 5.5,
                    period: 9,
                  },
                },
              },
            },
          ]);

        const response = await getRemoteForecast('2807');
        expect(response).to.have.lengthOf(4);
        expect(response).to.be.an('array');
        // @ts-ignore
        expect(response[0]).to.deep.eq(
          {
            id: '2807',
            timestamp: 1621983600,
            solidRating: 0,
            swell: {
              components: {
                combined: {
                  height: 5.5,
                  period: 9,
                },
              },
            },
          },
          'the response object has the id added'
        );

        mockedRequest.isDone();
      });
    });
  });
});
