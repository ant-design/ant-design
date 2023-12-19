import { fillWindowEnv } from './utils';

/* eslint-disable no-console */
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
  fillWindowEnv(window);
}

global.requestAnimationFrame = global.requestAnimationFrame || global.setTimeout;
global.cancelAnimationFrame = global.cancelAnimationFrame || global.clearTimeout;
