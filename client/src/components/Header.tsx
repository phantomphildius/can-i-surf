import React from 'react';
import { Box } from 'grommet';

const Header: React.FC<{ region?: string }> = ({ region }) => {
  return (
    <Box as="header" background="navy">
      Can I Surf{region && ` in ${region}`}?
    </Box>
  );
};

export default Header;
