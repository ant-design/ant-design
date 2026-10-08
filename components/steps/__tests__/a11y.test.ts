import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('steps', {
  // the avatar images in this demo still need alt text
  skip: ['inline.tsx'],
});
