import { toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import { defaultConfig } from '../components/theme/index';

// Not use dynamic hashed for test env since version will change hash dynamically.
defaultConfig.hashed = false;

if (process.env.LIB_DIR === 'dist') {
  jest.mock('../dist/antd', () => {
    const antd = jest.requireActual('../dist/antd');
    antd.theme.defaultConfig.hashed = false;

    return antd;
  });
} else if (process.env.LIB_DIR === 'es') {
  jest.mock('../es/theme', () => {
    const esTheme = jest.requireActual('../es/theme');
    if (esTheme.defaultConfig) {
      esTheme.defaultConfig.hashed = false;
    }

    return esTheme;
  });
}

expect.extend(toHaveNoViolations);
