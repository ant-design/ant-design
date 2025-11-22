import { extendTest } from '../../../tests/shared/demoTest';

const originalGetComputedStyle = window.getComputedStyle;

beforeAll(() => {
  Object.defineProperty(window, 'getComputedStyle', {
    value: (node: Element) => ({
      getPropertyValue: (prop: PropertyKey) => {
        if (prop === 'box-sizing') {
          return originalGetComputedStyle(node)[prop as unknown as number] || 'border-box';
        }

        const oriValue = originalGetComputedStyle(node)[prop as unknown as number];
        if (['padding', 'width', 'height'].some((p) => prop.toString().includes(p))) {
          return oriValue || '1px';
        }
        return oriValue;
      },
    }),
  });
});

extendTest('input', {
  skip: ['component-token.tsx'],
});
