import { Box, Button, Heading } from 'grommet';
import React from 'react';

import Recommendation from './Recommendation';
import { usePost, useBreakpoint } from '../hooks';
import { Recommendation as IRecommendation, Spot } from '../data';

const TimeWindows: React.FC<{
  handleCloseButton: () => void;
  spot: Spot;
}> = ({ handleCloseButton, spot }) => {
  const {
    data: timeWindows,
    loading,
    errors,
  } = usePost<{ spotId: number }, IRecommendation[]>(
    '/recommendations/window',
    { spotId: spot.id }
  );

  const size = useBreakpoint();
  const isNotLargeScreen = size !== 'large';

  const Loader: React.FC = () => <Heading level="2">Building....</Heading>;

  if (loading && !(timeWindows || errors)) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <>
      <Box
        direction="row"
        fill="horizontal"
        justify="between"
        pad={{ horizontal: 'medium' }}
      >
        <Heading
          data-testid={`details-header-${spot.name}`}
          level={isNotLargeScreen ? '2' : '4'}
        >
          {!isNotLargeScreen && 'Other time windows at '} {spot.name}
        </Heading>
        <Box alignSelf="center">
          <Button onClick={() => handleCloseButton()}>X</Button>
        </Box>
      </Box>
      {timeWindows && !errors ? (
        <Box tag="section" justify="center" gap="medium" pad="medium">
          {timeWindows.map((tw) => (
            <Recommendation key={tw.time} {...tw} isActive={false} />
          ))}
        </Box>
      ) : (
        <>
          <h3>Nothing much out there</h3>
          <p>{errors?.details}</p>
        </>
      )}
    </>
  );
};

export default TimeWindows;
