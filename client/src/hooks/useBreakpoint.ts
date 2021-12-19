import { useContext } from 'react';
import { ResponsiveContext } from 'grommet';

export const useBreakpoint = () => useContext(ResponsiveContext);
