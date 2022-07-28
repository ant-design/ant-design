import React from 'react';
import type { ReactWrapper } from 'enzyme';
import { mount } from 'enzyme';
import { sleep, render } from '../utils';

// eslint-disable-next-line jest/no-export
export default function focusTest(
  Component: React.ComponentType<any>,
  { refFocus = false, testLib = false } = {},
) {
  describe('focus and blur', () => {
    let focused = false;
    let blurred = false;
    const mockFocus = jest.spyOn(HTMLElement.prototype, 'focus');
    const mockBlur = jest.spyOn(HTMLElement.prototype, 'blur');

    beforeAll(() => {
      if (refFocus) {
        mockFocus.mockImplementation(() => {
          focused = true;
        });
        mockBlur.mockImplementation(() => {
          blurred = true;
        });
      }
    });

    // ==================== React Test Lib ====================
    if (testLib) {
      it('Test: focus() and onFocus', () => {
        const handleFocus = jest.fn();
        const ref = React.createRef<any>();
        const { unmount } = render(<Component onFocus={handleFocus} ref={ref} />);
        ref.current.focus();
        expect(handleFocus).toHaveBeenCalled();

        unmount();
      });

      it('Test: blur() and onBlur', async () => {
        const handleBlur = jest.fn();
        const ref = React.createRef<any>();
        const { unmount } = render(<Component ref={ref} onBlur={handleBlur} />);
        ref.current.focus();
        ref.current.blur();
        expect(handleBlur).toHaveBeenCalled();

        unmount();
      });

      it('Test: autoFocus', () => {
        const handleFocus = jest.fn();
        const { unmount } = render(<Component autoFocus onFocus={handleFocus} />);
        expect(handleFocus).toHaveBeenCalled();

        unmount();
      });

      return;
    }

    // ======================== Enzyme ========================
    let container: HTMLElement;
    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      focused = false;
      blurred = false;
    });

    afterAll(() => {
      mockFocus.mockRestore();
      mockBlur.mockRestore();
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    const getElement = (wrapper: ReactWrapper) => {
      let ele = wrapper.find('input').first();
      if (ele.length === 0) {
        ele = wrapper.find('button').first();
      }
      if (ele.length === 0) {
        ele = wrapper.find('textarea').first();
      }
      if (ele.length === 0) {
        ele = wrapper.find('div[tabIndex]').first();
      }
      return ele;
    };

    if (refFocus) {
      it('Ref: focus() and onFocus', () => {
        const onFocus = jest.fn();
        const ref = React.createRef<any>();
        const wrapper = mount(
          <div>
            <Component onFocus={onFocus} ref={ref} />
          </div>,
        );
        ref.current.focus();
        expect(focused).toBeTruthy();

        getElement(wrapper).simulate('focus');
        expect(onFocus).toHaveBeenCalled();
      });

      it('Ref: blur() and onBlur', async () => {
        jest.useRealTimers();
        const onBlur = jest.fn();
        const ref = React.createRef<any>();
        const wrapper = mount(
          <div>
            <Component onBlur={onBlur} ref={ref} />
          </div>,
        );

        ref.current.blur();
        expect(blurred).toBeTruthy();

        getElement(wrapper).simulate('blur');
        await sleep(0);
        expect(onBlur).toHaveBeenCalled();
      });

      it('Ref: autoFocus', () => {
        const onFocus = jest.fn();
        const wrapper = mount(<Component autoFocus onFocus={onFocus} />);

        expect(focused).toBeTruthy();

        getElement(wrapper).simulate('focus');
        expect(onFocus).toHaveBeenCalled();
      });
    } else {
      it('focus() and onFocus', () => {
        const handleFocus = jest.fn();
        const wrapper = mount(<Component onFocus={handleFocus} />, { attachTo: container });
        (wrapper.instance() as any).focus();
        expect(handleFocus).toHaveBeenCalled();
      });

      it('blur() and onBlur', async () => {
        jest.useRealTimers();
        const handleBlur = jest.fn();
        const wrapper = mount(<Component onBlur={handleBlur} />, { attachTo: container });
        (wrapper.instance() as any).focus();
        await sleep(0);
        (wrapper.instance() as any).blur();
        await sleep(0);
        expect(handleBlur).toHaveBeenCalled();
      });

      it('autoFocus', () => {
        const handleFocus = jest.fn();
        mount(<Component autoFocus onFocus={handleFocus} />, { attachTo: container });
        expect(handleFocus).toHaveBeenCalled();
      });
    }
  });
}
