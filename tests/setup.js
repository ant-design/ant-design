const React = require('react');
const util = require('util');

const { _rs: onLibResize } = require('rc-resize-observer/lib/utils/observerUtil');
const { _rs: onEsResize } = require('rc-resize-observer/es/utils/observerUtil');

// eslint-disable-next-line no-console
console.log('Current React Version:', React.version);

// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useLayoutEffect: jest.requireActual('react').useEffect,
// }));

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
      value: jest.fn(query => ({
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
  Object.defineProperty(window, 'TextEncoder', {
    writable: true,
    value: util.TextEncoder,
  });
  Object.defineProperty(window, 'TextDecoder', {
    writable: true,
    value: util.TextDecoder,
  });
}

const Enzyme = require('enzyme');

const Adapter =
  process.env.REACT === '16'
    ? require('enzyme-adapter-react-16') // eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved
    : require('@wojtekmaj/enzyme-adapter-react-17');

Enzyme.configure({ adapter: new Adapter() });

Object.assign(Enzyme.ReactWrapper.prototype, {
  findObserver(index = 0) {
    return this.find('ResizeObserver').at(index);
  },
  triggerResize(index = 0) {
    const target = this.findObserver(index).getDOMNode();
    const originGetBoundingClientRect = target.getBoundingClientRect;

    target.getBoundingClientRect = () => ({ width: 510, height: 903 });
    onLibResize([{ target }]);
    onEsResize([{ target }]);

    target.getBoundingClientRect = originGetBoundingClientRect;
  },
});

// React.StrictMode wrapper
jest.mock('enzyme', () => {
  const enzyme = jest.requireActual('enzyme');
  const { StrictMode, cloneElement } = jest.requireActual('react');
  const { mount, render } = enzyme;

  function EnzymeWrapper({ strictMode, children, ...props }) {
    // Not wrap StrictMode for some test case need count render times
    if (strictMode === false) {
      return cloneElement(children, props);
    }

    return <StrictMode>{cloneElement(children, props)}</StrictMode>;
  }

  return {
    ...enzyme,
    mount: (ui, { strictMode, ...config } = {}, ...args) =>
      mount(<EnzymeWrapper strictMode={strictMode}>{ui}</EnzymeWrapper>, config, ...args),
    render: (ui, { strictMode, ...config } = {}, ...args) =>
      render(<EnzymeWrapper strictMode={strictMode}>{ui}</EnzymeWrapper>, config, ...args),
    originMount: mount,
  };
});
