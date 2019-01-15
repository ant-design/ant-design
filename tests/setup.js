/* eslint-disable global-require */
if (typeof window !== 'undefined') {
  global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = height || global.window.innerHeight;
    global.window.dispatchEvent(new Event('resize'));
  };
  global.window.scrollTo = () => {};
}

// The built-in requestAnimationFrame and cancelAnimationFrame not working with jest.runFakeTimes()
// https://github.com/facebook/jest/issues/5147
global.requestAnimationFrame = cb => setTimeout(cb, 0);
global.cancelAnimationFrame = cb => clearTimeout(cb, 0);

const Enzyme = require('enzyme');

let Adapter;
if (process.env.REACT === '15') {
  Adapter = require('enzyme-adapter-react-15'); // eslint-disable-line
} else {
  Adapter = require('enzyme-adapter-react-16');
}

Enzyme.configure({ adapter: new Adapter() });
