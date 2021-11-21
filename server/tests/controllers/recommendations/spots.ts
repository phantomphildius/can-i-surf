import { request } from 'express';
import * as chai from 'chai';
import sinon, { SinonStub } from 'sinon';
import chaiHttp from 'chai-http';

import * as recommendationEngine from '../../../src/models/recommendation';
import { createSpotRecommendation } from '../../../src/controllers/recommendations/spots';

chai.use(chaiHttp);

describe('#createSpotRecommendation', () => {
  let getBestBetStub: SinonStub;
  let requestStub: SinonStub;

  beforeEach(() => {
    getBestBetStub = sinon.stub(recommendationEngine, 'getBestBetLocations');
    requestStub = sinon.stub(request.body, 'location');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Error States', () => {
    describe('without a location parameter', function () {
      it('returns a 422 error', async () => {
        requestStub.returns('');

        creatSpotRecommendation(requestStub);
      });
    });
    describe('when the api returns an error', function () {
      it('returns a 400 error', async () => {});
    });
    describe('when something goes wrong', function () {
      it('returns a 500 error', async () => {});
    });
  });
  describe('Success State', () => {
    it('returns a recommendation collection', async () => {});
  });
});
