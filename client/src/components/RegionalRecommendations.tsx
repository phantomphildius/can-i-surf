import React, { useState } from 'react';
import { useParams } from 'react-router';
import camelCase from 'lodash.camelcase';
import { Box, Heading, Layer } from 'grommet';

import Recommendation from './Recommendation';
import Header from './Header';
import { usePost } from '../hooks/usePost';
import { Recommendation as IRecommendation, Spot } from '../data';
import { useBreakpoint } from '../hooks';
import TimeWindows from './TimeWindows';

const RegionalRecommendations: React.FC = () => {
  const [isLocationDetailsOpen, setIsLocationDetailsOpen] =
    useState<boolean>(false);
  const [spot, setSpot] = useState<Spot | null>(null);

  const size = useBreakpoint();
  const isLargeScreen = size === 'large';

  const showRecommendationDetails = spot && isLocationDetailsOpen;
  const handleSpotSelection = (spot: Spot) => {
    setIsLocationDetailsOpen(true);
    setSpot(spot);
  };
  const handleRecommendationDetailsClose = () => {
    setIsLocationDetailsOpen(false);
    setSpot(null);
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
    <Box fill="horizontal">
      <Header region={location} />
      <Box pad={{ left: 'medium' }}>
        <Heading level="2">Best bets are</Heading>
      </Box>
      {recommendations && !errors ? (
        <Box tag="section">
          <Box direction="row-responsive" gap="xlarge">
            <Box
              justify="center"
              gap="medium"
              pad="medium"
              basis={isLargeScreen ? '1/2' : ''}
            >
              {recommendations.map((rec) => (
                <Recommendation
                  key={rec.id}
                  handleSpotSelection={handleSpotSelection}
                  isActive={!!(spot?.id && spot.id === rec.id)}
                  {...rec}
                />
              ))}
            </Box>
            {isLargeScreen && showRecommendationDetails && (
              <Box animation="fadeIn">
                <TimeWindows
                  handleCloseButton={handleRecommendationDetailsClose}
                  spot={spot}
                />
              </Box>
            )}
          </Box>
          {!isLargeScreen && showRecommendationDetails && (
            <Layer
              full
              background="aqua"
              animation="fadeIn"
              onEsc={() => handleRecommendationDetailsClose()}
              onClickOutside={() => handleRecommendationDetailsClose()}
              role="dialog"
            >
              <TimeWindows
                handleCloseButton={handleRecommendationDetailsClose}
                spot={spot}
              />
            </Layer>
          )}
        </Box>
      ) : (
        <>
          <h3>Guess not! Bummer dude</h3>
          <p>{errors?.details}</p>
        </>
      )}
    </Box>
  );
};

export default RegionalRecommendations;
