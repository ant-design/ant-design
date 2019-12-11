import React from 'react';
import { mount } from 'enzyme';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';

// eslint-disable-next-line jest/no-export
export default function focusTest(Component, refFocus = false) {
  describe('focus and blur', () => {
    let domSpy;
    let focused = false;
    let blurred = false;

    beforeAll(() => {
      jest.useFakeTimers();
      if (refFocus) {
        domSpy = spyElementPrototypes(HTMLElement, {
          focus() {
            focused = true;
          },
          blur() {
            blurred = true;
          },
        });
      }
    });

    let container;
    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      focused = false;
      blurred = false;
    });

    afterAll(() => {
      if (domSpy) {
        domSpy.mockRestore();
      }
      jest.useRealTimers();
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    if (refFocus) {
      it('Ref: focus() and onFocus', () => {
        const onFocus = jest.fn();
        const ref = React.createRef();
        const wrapper = mount(
          <div>
            <Component onFocus={onFocus} ref={ref} />
          </div>,
        );
        ref.current.focus();
        expect(focused).toBeTruthy();

        wrapper
          .find('input')
          .first()
          .simulate('focus');
        expect(onFocus).toHaveBeenCalled();
      });

      it('Ref: blur() and onBlur', () => {
        const onBlur = jest.fn();
        const ref = React.createRef();
        const wrapper = mount(
          <div>
            <Component onBlur={onBlur} ref={ref} />
          </div>,
        );
        ref.current.blur();
        expect(blurred).toBeTruthy();

        wrapper
          .find('input')
          .first()
          .simulate('blur');
        expect(onBlur).toHaveBeenCalled();
      });

      it('Ref: autoFocus', () => {
        const onFocus = jest.fn();
        const wrapper = mount(<Component autoFocus onFocus={onFocus} />);

        expect(focused).toBeTruthy();

        wrapper
          .find('input')
          .first()
          .simulate('focus');
        expect(onFocus).toHaveBeenCalled();
      });
    } else {
      it('focus() and onFocus', () => {
        const handleFocus = jest.fn();
        const wrapper = mount(<Component onFocus={handleFocus} />, { attachTo: container });
        wrapper.instance().focus();
        expect(handleFocus).toHaveBeenCalled();
      });

      it('blur() and onBlur', () => {
        const handleBlur = jest.fn();
        const wrapper = mount(<Component onBlur={handleBlur} />, { attachTo: container });
        wrapper.instance().focus();
        jest.runAllTimers();
        wrapper.instance().blur();
        jest.runAllTimers();
        expect(handleBlur).toHaveBeenCalled();
      });

      it('autoFocus', () => {
        const handleFocus = jest.fn();
        mount(<Component autoFocus onFocus={handleFocus} />, { attachTo: container });
        jest.runAllTimers();
        expect(handleFocus).toHaveBeenCalled();
      });
    }
  });
}
