import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background: #a3e4d7;
  color: #21618c;
`;

const Header: React.FC<{ region?: string }> = ({ region }) => {
  return <StyledHeader>Can I Surf{region && ` in ${region}`}?</StyledHeader>;
};

export default Header;
