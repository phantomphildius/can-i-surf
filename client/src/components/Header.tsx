import React from 'react';
import { Box } from 'grommet';
import { Link } from 'react-router-dom';
import dasherize from 'lodash.kebabcase';
import capitalize from 'lodash.capitalize';

const humanReadableString = (region: string): string =>
  dasherize(region)
    .split('-')
    .map((reg) => capitalize(reg))
    .join(' ');

const Header: React.FC<{ region?: string }> = ({ region }) => {
  return (
    <Box
      as="header"
      background="navy"
      direction="row"
      justify="between"
      pad="small"
    >
      <Box tag="span" direction="row">
        <Link to="/" style={{ textDecoration: 'none', color: '#faf9f6' }}>
          Can I Surf{!region && '?'}&nbsp;
        </Link>{' '}
        {region && `in ${humanReadableString(region)}?`}
      </Box>
      <Box tag="span">
        <Link to="/about" style={{ textDecoration: 'none', color: '#faf9f6' }}>
          About
        </Link>
      </Box>
    </Box>
  );
};

export default Header;
