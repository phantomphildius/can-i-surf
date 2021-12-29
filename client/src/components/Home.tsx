import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardBody, Heading, Spinner } from 'grommet';

import Header from './Header';
import { useBreakpoint, useFetch } from '../hooks';
import { Location } from '../data';

const LocationLink: React.FC<{ linkObject: Record<string, string> }> = ({
  linkObject,
}) => {
  const [slug, name] = Object.entries(linkObject)[0];

  return (
    <Link
      to={`/spots/${slug}`}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <Card pad={{ horizontal: 'large' }} background="navy">
        <CardBody justify="center">
          <Heading level="3" alignSelf="center">
            {name}
          </Heading>
        </CardBody>
      </Card>
    </Link>
  );
};

const Home: React.FC = () => {
  const size = useBreakpoint();
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
          direction={size !== 'large' ? 'column' : 'row'}
          justify="center"
          gap="medium"
          fill="horizontal"
          pad="medium"
        >
          {locations.map((location) => (
            <LocationLink
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
