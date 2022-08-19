/* eslint-disable global-require, import/no-unresolved */
import { toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import { defaultConfig } from '../components/theme';

// Test env do not need compare hashed since this will change every version
if (process.env.LIB_DIR === 'dist') {
  const antd = require('../dist/antd');
  antd.theme.defaultConfig.hashed = false;
} else if (process.env.LIB_DIR === 'es') {
  const antd = require('../es');
  antd.theme.defaultConfig.hashed = false;
} else {
  defaultConfig.hashed = false;
}

expect.extend(toHaveNoViolations);
/* eslint-enable */
