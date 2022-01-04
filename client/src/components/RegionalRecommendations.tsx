import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Box, Heading, Layer, Paragraph, Spinner } from 'grommet';

import Header from './Header';
import Recommendation from './Recommendation';
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
    // @ts-ignore
    { location }
  );

  if (loading && !errors) {
    return (
      <Box>
        <Header />
        <Box justify="center" align="center">
          <Spinner
            message={{ start: 'Finding out...', end: 'Recommendations loaded' }}
            color="salmon"
            size="large"
          />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Header region={location} />
      <Box fill="horizontal">
        <Box pad={{ left: 'medium' }}>
          <Heading level="2">
            Best bets are{!recommendations?.length && ' non existent'}
          </Heading>
        </Box>
        {recommendations?.length && !errors ? (
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
          <Box tag="section" pad="medium">
            <Heading level="3">
              Guess you're not going surfing today! Bummer.
            </Heading>
            <Paragraph>
              {errors?.details ?? 'Hopefully the drought ends soon'}
            </Paragraph>
          </Box>
        )}
      </Box>
    </>
  );
};

export default RegionalRecommendations;
