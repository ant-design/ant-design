import React from 'react';

import type { useAppProps } from './context';
import AppContext from './context';

const useApp = () => React.useContext<useAppProps>(AppContext);

export default useApp;
