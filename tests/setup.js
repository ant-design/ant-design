/* eslint-disable no-console */
const util = require('util');
const React = require('react');

// eslint-disable-next-line no-console
console.log('Current React Version:', React.version);

const originConsoleErr = console.error;

// Hack off React warning to avoid too large log in CI.
console.error = (...args) => {
  const str = args.join('').replace(/\n/g, '');

  if (
    ['validateDOMNesting', 'on an unmounted component', 'not wrapped in act'].every(
      (warn) => !str.includes(warn),
    )
  ) {
    originConsoleErr(...args);
  }
};

/* eslint-disable global-require */
if (typeof window !== 'undefined') {
  global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = height || global.window.innerHeight;
    global.window.dispatchEvent(new Event('resize'));
  };
  global.window.scrollTo = () => {};
  // ref: https://github.com/ant-design/ant-design/issues/18774
  if (!window.matchMedia) {
    Object.defineProperty(global.window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: jest.fn((query) => ({
        matches: query.includes('max-width'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
  }

  // Fix css-animation or rc-motion deps on these
  // https://github.com/react-component/motion/blob/9c04ef1a210a4f3246c9becba6e33ea945e00669/src/util/motion.ts#L27-L35
  // https://github.com/yiminghe/css-animation/blob/a5986d73fd7dfce75665337f39b91483d63a4c8c/src/Event.js#L44
  window.AnimationEvent = window.AnimationEvent || window.Event;
  window.TransitionEvent = window.TransitionEvent || window.Event;

  // ref: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  // ref: https://github.com/jsdom/jsdom/issues/2524
  Object.defineProperty(window, 'TextEncoder', { writable: true, value: util.TextEncoder });
  Object.defineProperty(window, 'TextDecoder', { writable: true, value: util.TextDecoder });
}
