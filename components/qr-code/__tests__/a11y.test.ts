import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

accessibilityDemoTest('qr-code', {
  // we can add aria attributes to fix it
  disabledRules: ['role-img-alt', 'svg-img-alt'],
  // waiting for rc-segmented fix
  skip: ['errorlevel.tsx', 'download.tsx'],
});
