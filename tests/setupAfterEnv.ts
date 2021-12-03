import { toHaveNoViolations } from 'jest-axe';
import toMatchRenderedSnapshot from './matchers/rendered-snapshot';

expect.extend(toHaveNoViolations);
expect.extend({
  toMatchRenderedSnapshot,
});
