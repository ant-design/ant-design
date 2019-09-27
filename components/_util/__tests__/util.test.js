import raf from 'raf';
import React from 'react';
import { mount } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';
import delayRaf from '../raf';
import throttleByAnimationFrame from '../throttleByAnimationFrame';
import getDataOrAriaProps from '../getDataOrAriaProps';
import triggerEvent from '../triggerEvent';
import Wave from '../wave';
import TransButton from '../transButton';
import openAnimation from '../openAnimation';
import ResizeObserver from '../resizeObserver';
import { spyElementPrototype } from '../../__tests__/util/domHook';

describe('Test utils function', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('throttle function should work', () => {
    const callback = jest.fn();
    const throttled = throttleByAnimationFrame(callback);
    expect(callback).not.toHaveBeenCalled();

    throttled();
    throttled();

    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
    expect(callback.mock.calls.length).toBe(1);
  });

  it('throttle function should be canceled', () => {
    const callback = jest.fn();
    const throttled = throttleByAnimationFrame(callback);

    throttled();
    throttled.cancel();

    jest.runAllTimers();
    expect(callback).not.toHaveBeenCalled();
  });

  describe('getDataOrAriaProps', () => {
    it('returns all data-* properties from an object', () => {
      const props = {
        onClick: () => {},
        isOpen: true,
        'data-test': 'test-id',
        'data-id': 1234,
      };
      const results = getDataOrAriaProps(props);
      expect(results).toEqual({
        'data-test': 'test-id',
        'data-id': 1234,
      });
    });

    it('does not return data-__ properties from an object', () => {
      const props = {
        onClick: () => {},
        isOpen: true,
        'data-__test': 'test-id',
        'data-__id': 1234,
      };
      const results = getDataOrAriaProps(props);
      expect(results).toEqual({});
    });

    it('returns all aria-* properties from an object', () => {
      const props = {
        onClick: () => {},
        isOpen: true,
        'aria-labelledby': 'label-id',
        'aria-label': 'some-label',
      };
      const results = getDataOrAriaProps(props);
      expect(results).toEqual({
        'aria-labelledby': 'label-id',
        'aria-label': 'some-label',
      });
    });

    it('returns role property from an object', () => {
      const props = {
        onClick: () => {},
        isOpen: true,
        role: 'search',
      };
      const results = getDataOrAriaProps(props);
      expect(results).toEqual({ role: 'search' });
    });
  });

  it('delayRaf', done => {
    jest.useRealTimers();

    let bamboo = false;
    delayRaf(() => {
      bamboo = true;
    }, 3);

    // Do nothing, but insert in the frame
    // https://github.com/ant-design/ant-design/issues/16290
    delayRaf(() => {}, 3);

    // Variable bamboo should be false in frame 2 but true in frame 4
    raf(() => {
      expect(bamboo).toBe(false);

      // Frame 2
      raf(() => {
        expect(bamboo).toBe(false);

        // Frame 3
        raf(() => {
          // Frame 4
          raf(() => {
            expect(bamboo).toBe(true);
            done();
          });
        });
      });
    });
  });

  it('triggerEvent', () => {
    const button = document.createElement('button');
    button.addEventListener(
      'click',
      () => {
        button.style.width = '100px';
      },
      true,
    );
    triggerEvent(button, 'click');
    expect(button.style.width).toBe('100px');
  });

  describe('wave', () => {
    it('bindAnimationEvent should return when node is null', () => {
      const wrapper = mount(
        <Wave>
          <button type="button" disabled>
            button
          </button>
        </Wave>,
      ).instance();
      expect(wrapper.bindAnimationEvent()).toBe(undefined);
    });

    it('bindAnimationEvent.onClick should return when children is hidden', () => {
      const wrapper = mount(
        <Wave>
          <button type="button" style={{ display: 'none' }}>
            button
          </button>
        </Wave>,
      ).instance();
      expect(wrapper.bindAnimationEvent()).toBe(undefined);
    });

    it('bindAnimationEvent.onClick should return when children is input', () => {
      const wrapper = mount(
        <Wave>
          <input />
        </Wave>,
      ).instance();
      expect(wrapper.bindAnimationEvent()).toBe(undefined);
    });

    it('should not throw when click it', () => {
      expect(() => {
        const wrapper = mount(
          <Wave>
            <div />
          </Wave>,
        );
        wrapper.simulate('click');
      }).not.toThrow();
    });

    it('should not throw when no children', () => {
      if (process.env.REACT === '15') {
        return;
      }
      expect(() => mount(<Wave />)).not.toThrow();
    });
  });

  describe('TransButton', () => {
    it('can be focus/blur', () => {
      const wrapper = mount(<TransButton>TransButton</TransButton>);
      expect(typeof wrapper.instance().focus).toBe('function');
      expect(typeof wrapper.instance().blur).toBe('function');
    });

    it('should trigger onClick when press enter', () => {
      const onClick = jest.fn();
      const preventDefault = jest.fn();
      const wrapper = mount(<TransButton onClick={onClick}>TransButton</TransButton>);
      wrapper.simulate('keyUp', { keyCode: KeyCode.ENTER });
      expect(onClick).toHaveBeenCalled();
      wrapper.simulate('keyDown', { keyCode: KeyCode.ENTER, preventDefault });
      expect(preventDefault).toHaveBeenCalled();
    });
  });

  describe('openAnimation', () => {
    it('should support openAnimation', () => {
      const done = jest.fn();
      const domNode = document.createElement('div');
      expect(typeof openAnimation.enter).toBe('function');
      expect(typeof openAnimation.leave).toBe('function');
      expect(typeof openAnimation.appear).toBe('function');
      const appear = openAnimation.appear(domNode, done);
      const enter = openAnimation.enter(domNode, done);
      const leave = openAnimation.leave(domNode, done);
      expect(typeof appear.stop).toBe('function');
      expect(typeof enter.stop).toBe('function');
      expect(typeof leave.stop).toBe('function');
      expect(done).toHaveBeenCalled();
    });
  });

  describe('ResizeObserver', () => {
    let domMock;

    beforeAll(() => {
      domMock = spyElementPrototype(HTMLDivElement, 'getBoundingClientRect', () => {
        return {
          width: 1128 + Math.random(),
          height: 903 + Math.random(),
        };
      });
    });

    afterAll(() => {
      domMock.mockRestore();
    });

    it('should not trigger `onResize` if size shaking', () => {
      const onResize = jest.fn();
      let divNode;

      const wrapper = mount(
        <ResizeObserver onResize={onResize}>
          <div
            ref={node => {
              divNode = node;
            }}
          />
        </ResizeObserver>,
      );

      // First trigger
      wrapper.instance().onResize([{ target: divNode }]);
      onResize.mockReset();

      // Repeat trigger should not trigger outer `onResize` with shaking
      for (let i = 0; i < 10; i += 1) {
        wrapper.instance().onResize([{ target: divNode }]);
      }

      expect(onResize).not.toHaveBeenCalled();
    });
  });
});
