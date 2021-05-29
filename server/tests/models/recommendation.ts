import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';

import { getBestBetLocations } from '../../src/models/recommendation';
import { spotMap } from '../../src/models/magic-seaweed/spots';
import * as api from '../../src/models/magic-seaweed/api';
import { Rating } from '../../src/types/magic-seaweed';

describe('Recommendation', () => {
  describe('#getBestBets', () => {
    let getRemoteForecastStub: SinonStub;

    beforeEach(() => {
      sinon.stub(spotMap, 'Rhode Island').value({
        '846': 'Second Beach',
        '574': 'Ruggles',
        '377': 'Matunuck',
        '907': 'First beach',
      });

      getRemoteForecastStub = sinon.stub(api, 'getRemoteForecast');

      const ruggles = [
        {
          id: '574',
          localTimestamp: 1621983600,
          solidRating: 3 as Rating,
          fadedRating: 0 as Rating,
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
          id: '574',
          localTimestamp: 1621983601,
          solidRating: 4 as Rating,
          fadedRating: 0 as Rating,
          swell: {
            components: {
              combined: {
                height: 5.5,
                period: 9,
              },
            },
          },
        },
      ];

      const matunuck = [
        {
          id: '377',
          localTimestamp: 3621983600,
          solidRating: 0 as Rating,
          fadedRating: 0 as Rating,
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
          id: '377',
          localTimestamp: 3621983601,
          solidRating: 1 as Rating,
          fadedRating: 0 as Rating,
          swell: {
            components: {
              combined: {
                height: 2,
                period: 5,
              },
            },
          },
        },
      ];

      const firstBeach = [
        {
          id: '907',
          localTimestamp: 4621983600,
          solidRating: 0 as Rating,
          fadedRating: 0 as Rating,
          swell: {
            components: {
              combined: {
                height: 2,
                period: 5,
              },
            },
          },
        },
        {
          id: '907',
          localTimestamp: 4621983601,
          solidRating: 0 as Rating,
          fadedRating: 0 as Rating,
          swell: {
            components: {
              combined: {
                height: 2,
                period: 5,
              },
            },
          },
        },
      ];
      getRemoteForecastStub
        .withArgs('907')
        .resolves(firstBeach)
        .withArgs('574')
        .resolves(ruggles)
        .withArgs('377')
        .resolves(matunuck);
    });

    afterEach(() => {
      sinon.restore();
    });

    describe('Given a location and result count', function () {
      it('returns the given array of location forecasts', async function () {
        const secondBeach = [
          {
            id: '846',
            localTimestamp: 2621983600,
            solidRating: 0 as Rating,
            fadedRating: 0 as Rating,
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
            id: '846',
            localTimestamp: 2621983601,
            solidRating: 1 as Rating,
            fadedRating: 0 as Rating,
            swell: {
              components: {
                combined: {
                  height: 5.5,
                  period: 9,
                },
              },
            },
          },
        ];
        getRemoteForecastStub.withArgs('846').resolves(secondBeach);

        const response = await getBestBetLocations('Rhode Island', 3);

        expect(response).to.be.an('array');
        expect(response).to.have.lengthOf(3);

        // @ts-ignore
        const rugglesResponse = response[0];
        expect(rugglesResponse).to.include({ id: '574' });

        // @ts-ignore
        const secondResponse = response[1];
        expect(secondResponse).to.include({ id: '846' });

        // @ts-ignore
        const matunuckResponse = response[2];
        expect(matunuckResponse).to.include({ id: '377' });
      });
    });

    describe('When there is a remote forecast api error', function () {
      it('only returns the error', async function () {
        const secondBeach = {
          error_response: {
            code: 501,
            error_msg: 'Something about incorrect parameters',
          },
        };
        getRemoteForecastStub.withArgs('846').resolves(secondBeach);

        const response = await getBestBetLocations('Rhode Island', 3);

        expect(response).to.be.an('object');
        expect(response).to.deep.equal({
          error_response: {
            code: 501,
            error_msg: 'Something about incorrect parameters',
          },
        });
      });
    });

    describe('When there nothing is returned from the api', function () {
      it('only returns the error', async function () {
        const secondBeach = {};
        getRemoteForecastStub.withArgs('846').resolves(secondBeach);

        const response = await getBestBetLocations('Rhode Island', 3);

        expect(response).to.be.undefined;
      });
    });
  });
});
