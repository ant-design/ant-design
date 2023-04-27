import React from 'react';
import { sleep, render, fireEvent } from '../utils';

// eslint-disable-next-line jest/no-export
export default function focusTest(
  Component: React.ComponentType<any>,
  { refFocus = false, testLib = false, blurDelay = 0 } = {},
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

    let containerHtml: HTMLElement;
    beforeEach(() => {
      containerHtml = document.createElement('div');
      document.body.appendChild(containerHtml);
      focused = false;
      blurred = false;
    });

    afterAll(() => {
      mockFocus.mockRestore();
      mockBlur.mockRestore();
    });

    afterEach(() => {
      document.body.removeChild(containerHtml);
    });

    const getElement = (container: { querySelector: Function }) =>
      container.querySelector('input') ||
      container.querySelector('button') ||
      container.querySelector('textarea') ||
      container.querySelector('div[tabIndex]');

    if (refFocus) {
      it('Ref: focus() and onFocus', () => {
        const onFocus = jest.fn();
        const ref = React.createRef<any>();
        const { container } = render(
          <div>
            <Component onFocus={onFocus} ref={ref} />
          </div>,
        );
        ref.current.focus();
        expect(focused).toBeTruthy();

        fireEvent.focus(getElement(container));
        expect(onFocus).toHaveBeenCalled();
      });

      it('Ref: blur() and onBlur', async () => {
        jest.useRealTimers();
        const onBlur = jest.fn();
        const ref = React.createRef<any>();
        const { container } = render(
          <div>
            <Component onBlur={onBlur} ref={ref} />
          </div>,
        );

        ref.current.blur();
        expect(blurred).toBeTruthy();

        fireEvent.blur(getElement(container));
        await sleep(blurDelay);
        expect(onBlur).toHaveBeenCalled();
      });

      it('Ref: autoFocus', () => {
        const onFocus = jest.fn();
        const { container } = render(<Component autoFocus onFocus={onFocus} />);

        expect(focused).toBeTruthy();

        fireEvent.focus(getElement(container));
        expect(onFocus).toHaveBeenCalled();
      });
    } else {
      it('focus() and onFocus', () => {
        const handleFocus = jest.fn();
        const { container } = render(<Component onFocus={handleFocus} />);
        fireEvent.focus(getElement(container));
        expect(handleFocus).toHaveBeenCalled();
      });

      it('blur() and onBlur', async () => {
        jest.useRealTimers();
        const handleBlur = jest.fn();
        const { container } = render(<Component onBlur={handleBlur} />);
        fireEvent.focus(getElement(container));
        await sleep(0);
        fireEvent.blur(getElement(container));
        await sleep(0);
        expect(handleBlur).toHaveBeenCalled();
      });

      it('autoFocus', () => {
        const handleFocus = jest.fn();
        render(<Component autoFocus onFocus={handleFocus} />);
        expect(handleFocus).toHaveBeenCalled();
      });
    }
  });
}
