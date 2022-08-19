/* eslint-disable global-require, import/no-unresolved */
import { toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

expect.extend(toHaveNoViolations);
/* eslint-enable */
