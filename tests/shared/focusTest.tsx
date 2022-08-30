import React from 'react';
import { sleep, render, fireEvent } from '../utils';

// eslint-disable-next-line jest/no-export
export default function focusTest(Component: React.ComponentType<any>) {
  describe('focus and blur', () => {
    let focused = false;
    let blurred = false;
    const mockFocus = jest.spyOn(HTMLElement.prototype, 'focus');
    const mockBlur = jest.spyOn(HTMLElement.prototype, 'blur');

    beforeAll(() => {
      mockFocus.mockImplementation(() => {
        focused = true;
      });
      mockBlur.mockImplementation(() => {
        blurred = true;
      });
    });

    afterAll(() => {
      mockFocus.mockRestore();
      mockBlur.mockRestore();
    });

    const containerHtml = document.createElement('div');
    beforeEach(() => {
      document.body.appendChild(containerHtml);
      focused = false;
      blurred = false;
    });

    afterEach(() => {
      document.body.removeChild(containerHtml);
      focused = false;
      blurred = false;
    });

    const getElement = (container: HTMLElement) =>
      container.querySelector('input') ||
      container.querySelector('button') ||
      container.querySelector('textarea') ||
      container.querySelector('div[tabIndex]');

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

      fireEvent.focus(getElement(container)!);
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

      fireEvent.blur(getElement(container)!);
      await sleep(0);
      expect(onBlur).toHaveBeenCalled();
    });

    it('Ref: autoFocus', () => {
      const onFocus = jest.fn();
      const { container } = render(<Component autoFocus onFocus={onFocus} />);

      expect(focused).toBeTruthy();

      fireEvent.focus(getElement(container)!);
      expect(onFocus).toHaveBeenCalled();
    });
  });
}
