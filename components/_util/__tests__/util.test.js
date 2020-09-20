import raf from 'raf';
import React from 'react';
import { mount } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';
import delayRaf from '../raf';
import throttleByAnimationFrame from '../throttleByAnimationFrame';
import getDataOrAriaProps from '../getDataOrAriaProps';
import Wave from '../wave';
import TransButton from '../transButton';
import { sleep } from '../../../tests/utils';
import focusTest from '../../../tests/shared/focusTest';

describe('Test utils function', () => {
  focusTest(TransButton);

  it('throttle function should work', async () => {
    const callback = jest.fn();
    const throttled = throttleByAnimationFrame(callback);
    expect(callback).not.toHaveBeenCalled();

    throttled();
    throttled();
    await sleep(20);

    expect(callback).toHaveBeenCalled();
    expect(callback.mock.calls.length).toBe(1);
  });

  it('throttle function should be canceled', async () => {
    const callback = jest.fn();
    const throttled = throttleByAnimationFrame(callback);

    throttled();
    throttled.cancel();
    await sleep(20);

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
});
