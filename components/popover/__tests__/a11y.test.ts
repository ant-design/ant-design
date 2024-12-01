import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

// wait for rc-segmented fix
accessibilityDemoTest('popover', { skip: ['arrow.tsx'] });
