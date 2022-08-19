import { toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import { defaultTokenContext } from '../components/theme';

defaultTokenContext.hashed = false;

expect.extend(toHaveNoViolations);
