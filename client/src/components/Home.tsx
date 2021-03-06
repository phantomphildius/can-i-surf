import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardBody, Heading, Spinner } from 'grommet';

import Header from './Header';
import { useBreakpoint, useFetch } from '../hooks';
import { Location } from '../data';

const LocationLink: React.FC<{
  linkObject: Record<string, string>;
  isNotLargeScreen: boolean;
}> = ({ linkObject, isNotLargeScreen }) => {
  const [slug, name] = Object.entries(linkObject)[0];

  return (
    <Box margin="small">
      <Link to={`/spots/${slug}`} style={{ textDecoration: 'none' }}>
        <Card
          width={isNotLargeScreen ? '' : 'large'}
          pad={{ horizontal: 'large' }}
          background="navy"
        >
          <CardBody justify="center">
            <Heading level="3" alignSelf="center">
              {name}
            </Heading>
          </CardBody>
        </Card>
      </Link>
    </Box>
  );
};

const Home: React.FC = () => {
  const size = useBreakpoint();
  const isNotLargeScreen = size !== 'large';
  const { loading, data: locations } = useFetch<Location[]>(
    '/recommendations/locations'
  );

  if (loading) {
    return (
      <>
        <Header />
        <Box alignSelf="center">
          <Spinner color="salmon" size="large" message="Loading locations" />
        </Box>
        ;
      </>
    );
  }

  return (
    <>
      <Header />
      <Heading level="2" alignSelf="center">
        Let's find out! Choose a region to start
      </Heading>
      {locations && (
        <Box
          tag="section"
          direction={isNotLargeScreen ? 'column' : 'row'}
          justify="between"
          pad="medium"
          wrap
        >
          {locations.map((location) => (
            <LocationLink
              isNotLargeScreen={isNotLargeScreen}
              linkObject={location}
              key={Object.keys(location)[0]}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default Home;
