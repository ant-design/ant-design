import React from 'react';
import { extendTest } from '../../../tests/shared/demoTest';

extendTest('tabs', {
  // https://github.com/codecks-io/react-sticky-box/issues/87
  // react-sticky-box is not compatible with React 16 and 17
  skip: /^(16|17)/.test(React.version) ? ['custom-tab-bar.tsx'] : [],
});
