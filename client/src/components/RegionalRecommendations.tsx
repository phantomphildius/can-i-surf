import React, { useState } from 'react';
import { useParams } from 'react-router';
import camelCase from 'lodash.camelcase';
import { Box, Heading, Layer } from 'grommet';

import Recommendation from './Recommendation';
import Header from './Header';
import { usePost } from '../hooks/usePost';
import { Recommendation as IRecommendation } from '../data';
import { useBreakpoint } from '../hooks';
import TimeWindows from './TimeWindows';

const RegionalRecommendations: React.FC = () => {
  const [isLocationDetailsOpen, setIsLocationDetailsOpen] =
    useState<boolean>(false);
  const [spotId, setSpotId] = useState<number | null>(null);

  const size = useBreakpoint();
  const isLargeScreen = size === 'large';

  const showSeeShowMoreLink = (id: number) => (spotId ? spotId !== id : true);
  const showRecommendationDetails = spotId && isLocationDetailsOpen;
  const handleSpotSelection = (spotId: number) => {
    setIsLocationDetailsOpen(true);
    setSpotId(spotId);
  };
  const handleRecommendationDetailsClose = () => {
    setIsLocationDetailsOpen(false);
    setSpotId(null);
  };

  const { region: location } = useParams();
  const {
    data: recommendations,
    loading,
    errors,
  } = usePost<{ location: string }, IRecommendation[]>(
    '/recommendations/spot',
    { location: camelCase(location) }
  );

  const Loader: React.FC = () => <Heading level="2">Finding out...</Heading>;

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
          <Box direction="row-responsive" gap="xlarge">
            <Box
              tag="section"
              justify="center"
              gap="medium"
              pad="medium"
              basis={isLargeScreen ? '1/2' : ''}
            >
              {recommendations.map((rec) => (
                <Recommendation
                  key={rec.id}
                  showSeeMoreLink={showSeeShowMoreLink(rec.id)}
                  handleSpotSelection={handleSpotSelection}
                  {...rec}
                />
              ))}
            </Box>
            {isLargeScreen && showRecommendationDetails && (
              <Box animation="fadeIn">
                <TimeWindows
                  handleCloseButton={handleRecommendationDetailsClose}
                  spotId={spotId}
                />
              </Box>
            )}
          </Box>
          {!isLargeScreen && showRecommendationDetails && (
            <Layer
              full
              background="salmon"
              animation="fadeIn"
              onEsc={() => handleRecommendationDetailsClose()}
              onClickOutside={() => handleRecommendationDetailsClose()}
            >
              <TimeWindows
                handleCloseButton={handleRecommendationDetailsClose}
                spotId={spotId}
              />
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

export default RegionalRecommendations;
