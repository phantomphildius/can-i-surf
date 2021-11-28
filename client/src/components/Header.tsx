import React from 'react';

const Header: React.FC<{ region?: string }> = ({ region }) => {
  return <header>Can I Surf{region && ` in ${region}`}?</header>;
};

export default Header;
