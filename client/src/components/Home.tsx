import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardBody, Heading, Text } from 'grommet';

import Header from './Header';
import { useBreakpoint } from '../hooks';

const RegionalLink: React.FC<{ name: string; slug: string }> = ({
  slug,
  name,
}) => (
  <Link to={`/spots/${slug}`}>
    <Card pad="medium">
      <CardBody justify="center">
        <Text alignSelf="center">{name}</Text>
      </CardBody>
    </Card>
  </Link>
);

const Intro: React.FC = () => {
  const size = useBreakpoint();

  return (
    <>
      <Header />
      <Heading level="2" alignSelf="center">
        Let's find out! Choose a region to start
      </Heading>
      <Box
        tag="section"
        direction={size !== 'large' ? 'column' : 'row'}
        justify="center"
        gap="medium"
        fill="horizontal"
        pad="medium"
      >
        <RegionalLink name="Rhode Island" slug="rhode-island" />
        <RegionalLink name="Hamptons" slug="hamptons" />
      </Box>
    </>
  );
};

export default Intro;
