import { Box, Heading } from 'grommet';
import React from 'react';
import { useParams, Link } from 'react-router-dom';

import Recommendation from './Recommendation';
import { usePost, useBreakpoint } from '../hooks';
import { Recommendation as IRecommendation } from '../data';

const TimeWindows: React.FC = () => {
  const { spotId } = useParams<{ spotId: string }>();

  const {
    data: timeWindows,
    loading,
    errors,
  } = usePost<{ spotId: string }, IRecommendation[]>(
    '/recommendations/window',
    // @ts-ignore
    { spotId }
  );

  const size = useBreakpoint();
  const isLargeScreen = size !== 'large';

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
        <Heading level={isLargeScreen ? '3' : '2'}>Secret Spot</Heading>
        <Box alignSelf="center">
          <Link to=".." style={{ textDecoration: 'none', color: 'black' }}>
            X
          </Link>
        </Box>
      </Box>
      {timeWindows && !errors ? (
        <Box tag="section" justify="center" gap="medium" pad="medium">
          {timeWindows.map((tw) => (
            <Recommendation
              key={tw.recommendationTime}
              {...tw}
              showSeeMoreLink={false}
            />
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
