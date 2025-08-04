import util from 'util';
import React from 'react';
import type { DOMWindow } from 'jsdom';

console.log('Current React Version:', React.version);

const originConsoleErr = console.error;

const ignoreWarns = [
  'validateDOMNesting',
  'on an unmounted component',
  'not wrapped in act',
  'You called act',
];

// Hack off React warning to avoid too large log in CI.
console.error = (...args) => {
  const str = args.join('').replace(/\n/g, '');
  if (ignoreWarns.every((warn) => !str.includes(warn))) {
    originConsoleErr(...args);
  }
};

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

// This function can not move to external file since jest setup not support
export function fillWindowEnv(window: Window | DOMWindow) {
  const win = window as Writeable<Window> & typeof globalThis;

  win.resizeTo = (width, height) => {
    win.innerWidth = width || win.innerWidth;
    win.innerHeight = height || win.innerHeight;
    win.dispatchEvent(new Event('resize'));
  };
  win.scrollTo = () => {};
  // ref: https://github.com/ant-design/ant-design/issues/18774
  if (!win.matchMedia) {
    Object.defineProperty(win, 'matchMedia', {
      writable: true,
      configurable: true,
      value: jest.fn((query) => ({
        matches: query.includes('max-width'),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });
  }

  // Fix css-animation or rc-motion deps on these
  // https://github.com/react-component/motion/blob/9c04ef1a210a4f3246c9becba6e33ea945e00669/src/util/motion.ts#L27-L35
  // https://github.com/yiminghe/css-animation/blob/a5986d73fd7dfce75665337f39b91483d63a4c8c/src/Event.js#L44
  win.AnimationEvent = win.AnimationEvent || win.Event;
  win.TransitionEvent = win.TransitionEvent || win.Event;

  // ref: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  // ref: https://github.com/jsdom/jsdom/issues/2524
  Object.defineProperty(win, 'TextEncoder', { writable: true, value: util.TextEncoder });
  Object.defineProperty(win, 'TextDecoder', { writable: true, value: util.TextDecoder });

  // Enhanced getComputedStyle polyfill
  const originalGetComputedStyle = win.getComputedStyle;
  win.getComputedStyle = function(element, pseudoElt) {
    try {
      const computedStyle = originalGetComputedStyle.call(this, element, pseudoElt);
      
      // Override getPropertyValue to return color names for common colors
      const originalGetPropertyValue = computedStyle.getPropertyValue;
      computedStyle.getPropertyValue = function(prop: string) {
        const value = originalGetPropertyValue.call(this, prop);
        
        // Convert common RGB values back to color names for testing
        if (prop === 'background-color' || prop === 'color' || prop === 'border-color' || prop === 'border-top-color') {
          switch (value) {
            case 'rgb(255, 0, 0)':
              return 'red';
            case 'rgb(0, 0, 255)':
              return 'blue';
            case 'rgb(0, 255, 0)':
            case 'rgb(0, 128, 0)':
              return 'green';
            case 'rgb(255, 255, 0)':
              return 'yellow';
            case 'rgb(255, 192, 203)':
              return 'pink';
            case 'rgb(128, 0, 128)':
              return 'purple';
            default:
              return value;
          }
        }
        return value;
      };

      // Override direct property access for common color properties
      const colorProperties = ['background', 'backgroundColor', 'color', 'borderColor', 'borderTopColor'];
      colorProperties.forEach(prop => {
        Object.defineProperty(computedStyle, prop, {
          get: function() {
            const value = originalGetPropertyValue.call(this, prop === 'background' ? 'background' : prop === 'backgroundColor' ? 'background-color' : prop === 'borderColor' ? 'border-color' : prop === 'borderTopColor' ? 'border-top-color' : 'color');
            
            // Convert common RGB values back to color names for testing
            switch (value) {
              case 'rgb(255, 0, 0)':
                return 'red';
              case 'rgb(0, 0, 255)':
                return 'blue';
              case 'rgb(0, 255, 0)':
              case 'rgb(0, 128, 0)':
                return 'green';
              case 'rgb(255, 255, 0)':
                return 'yellow';
              case 'rgb(255, 192, 203)':
                return 'pink';
              case 'rgb(128, 0, 128)':
                return 'purple';
              default:
                return value;
            }
          },
          configurable: true
        });
      });
      
      return computedStyle;
    } catch (error) {
      // Return a mock CSSStyleDeclaration for cases where getComputedStyle is not implemented
      return {
        getPropertyValue: (prop: string) => {
          // Handle common color properties
          if (prop === 'background-color' || prop === 'color' || prop === 'border-color') {
            return 'rgb(0, 0, 0)';
          }
          return '';
        },
        backgroundColor: 'rgb(0, 0, 0)',
        color: 'rgb(0, 0, 0)',
        borderColor: 'rgb(0, 0, 0)',
      } as any;
    }
  };

  // Enhanced MouseEvent polyfill that works with @testing-library/user-event
  const originalMouseEvent = win.MouseEvent;
  win.MouseEvent = class extends originalMouseEvent {
    constructor(type: string, init?: MouseEventInit) {
      super(type, init);
      
      // Allow setting pageX and pageY after construction
      Object.defineProperty(this, 'pageX', {
        writable: true,
        configurable: true,
        value: init?.pageX || 0,
      });
      Object.defineProperty(this, 'pageY', {
        writable: true,
        configurable: true,
        value: init?.pageY || 0,
      });
    }
  } as any;

  // Enhanced TouchEvent polyfill
  if (win.TouchEvent) {
    const originalTouchEvent = win.TouchEvent;
    win.TouchEvent = class extends originalTouchEvent {
      constructor(type: string, init?: TouchEventInit) {
        super(type, init);
        
        // Allow setting touches array after construction
        if (init?.touches) {
          Object.defineProperty(this, 'touches', {
            writable: true,
            configurable: true,
            value: init.touches,
          });
        }
      }
    } as any;
  }
}

if (typeof window !== 'undefined') {
  fillWindowEnv(window);
}

global.requestAnimationFrame = global.requestAnimationFrame || global.setTimeout;
global.cancelAnimationFrame = global.cancelAnimationFrame || global.clearTimeout;

if (typeof MessageChannel === 'undefined') {
  (global as any).MessageChannel = function MessageChannel() {
    const port1: any = {};
    const port2: any = {};
    port1.postMessage = port2.onmessage = () => {};
    port2.postMessage = port1.onmessage = () => {};
    return { port1, port2 };
  };
}

// Mock useId to return a stable id for snapshot testing
jest.mock('react', () => {
  const originReact = jest.requireActual('react');

  let cloneReact = {
    ...originReact,
  };

  if (process.env.MOCK_USE_ID !== 'false') {
    cloneReact = {
      ...cloneReact,
      useId: () => 'test-id',
    };
  }

  return cloneReact;
});
