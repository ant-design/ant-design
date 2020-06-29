import toMatchRenderedSnapshot from './matchers/rendered-snapshot';

expect.extend({
  toMatchRenderedSnapshot,
});
