import raf from 'raf';
import React from 'react';
import { mount } from 'enzyme';
import delayRaf from '../raf';
import throttleByAnimationFrame from '../throttleByAnimationFrame';
import getDataOrAriaProps from '../getDataOrAriaProps';
import triggerEvent from '../triggerEvent';
import Wave from '../wave';

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
          <button type="button" disabled />
        </Wave>,
      ).instance();
      expect(wrapper.bindAnimationEvent()).toBe(undefined);
    });

    it('bindAnimationEvent.onClick should return when children is hidden', () => {
      const wrapper = mount(
        <Wave>
          <button type="button" style={{ display: 'none' }} />
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
  });
});
