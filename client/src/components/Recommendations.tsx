import React from 'react';
import { Outlet, useParams, useNavigate } from 'react-router';

import camelCase from 'lodash.camelcase';
import { Box, Heading, Layer } from 'grommet';

import Recommendation from './Recommendation';
import Header from './Header';
import { usePost } from '../hooks/usePost';
import { Recommendation as IRecommendation } from '../data';
import { useBreakpoint } from '../hooks';

const Recommendations: React.FC = () => {
  const Loader: React.FC = () => <h2>Finding out...</h2>;
  const { region: location, spotId } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const size = useBreakpoint();
  const isLargeScreen = size === 'large';

  const {
    data: recommendations,
    loading,
    errors,
  } = usePost<{ location: string }, IRecommendation[]>(
    '/recommendations/spot',
    { location: camelCase(location) }
  );

  if (loading && !(recommendations || errors)) {
    return (
      <>
        <Header region={location} />
        <Loader />
      </>
    );
  }

  return (
    <>
      <Header region={location} />
      <Heading level="2">Best bets are</Heading>
      {recommendations && !errors ? (
        <>
          <Box direction="row-responsive">
            <Box
              tag="section"
              justify="center"
              gap="medium"
              pad="medium"
              basis={isLargeScreen ? '1/2' : ''}
            >
              {recommendations.map((rec) => (
                <Recommendation key={rec.id} {...rec} />
              ))}
            </Box>
            {spotId && isLargeScreen && (
              <Box animation="fadeIn">
                <Outlet />
              </Box>
            )}
          </Box>
          {spotId && !isLargeScreen && (
            <Layer
              full
              margin="medium"
              background="salmon"
              animation="fadeIn"
              onEsc={goBack}
              onClickOutside={goBack}
            >
              <Outlet />
            </Layer>
          )}
        </>
      ) : (
        <>
          <h3>Guess not! Bummer dude</h3>
          <p>{errors?.details}</p>
        </>
      )}
    </>
  );
};

export default Recommendations;
