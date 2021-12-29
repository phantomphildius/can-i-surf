import React from 'react';
import { Box } from 'grommet';

const Header: React.FC<{ region?: string }> = ({ region }) => {
  return (
    <Box
      as="header"
      background="navy"
      direction="row"
      justify="between"
      pad="small"
    >
      <Box tag="span">
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
