import accessibilityDemoTest from '../../../tests/shared/accessibilityTest';

// skip debug components
accessibilityDemoTest('modal', { skip: ['wireframe.tsx', 'render-panel.tsx'] });
