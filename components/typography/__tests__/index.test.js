import React from 'react';
import { mount } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';
import copy from 'copy-to-clipboard';
import Title from '../Title';
import Paragraph from '../Paragraph';
import Base from '../Base'; // eslint-disable-line import/no-named-as-default

jest.mock('copy-to-clipboard');

describe('Typography', () => {
  const LINE_STR_COUNT = 20;
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  // Mock offsetHeight
  const originOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
    .get;
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    get() {
      const lines = Math.ceil(this.innerHTML.length / LINE_STR_COUNT);
      return lines * 16;
    },
  });

  // Mock getComputedStyle
  const originGetComputedStyle = window.getComputedStyle;
  window.getComputedStyle = ele => {
    const style = originGetComputedStyle(ele);
    style.lineHeight = '16px';
    return style;
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    jest.useRealTimers();
    errorSpy.mockRestore();
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get: originOffsetHeight,
    });
    window.getComputedStyle = originGetComputedStyle;
  });

  describe('Title', () => {
    it('warning if `level` not correct', () => {
      mount(<Title level={false} />);

      expect(errorSpy).toBeCalledWith(
        'Warning: Title only accept `1 | 2 | 3 | 4` as `level` value.',
      );
    });
  });

  describe('Base', () => {
    describe('trigger ellipsis update', () => {
      const fullStr =
        'Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light';

      it('trigger ellipsis update', () => {
        const wrapper = mount(
          <Base rows={1} component="p">
            {fullStr}
          </Base>,
        );

        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find('span').text()).toEqual('Bamboo is Little...');

        wrapper.setProps({ rows: 2 });
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find('span').text()).toEqual('Bamboo is Little Light Bamboo is Lit...');

        wrapper.setProps({ rows: 99 });
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find('p').text()).toEqual(fullStr);

        wrapper.unmount();
      });

      it('should expand work', () => {
        const wrapper = mount(
          <Base rows={1} component="p" copyable editable extendable>
            {fullStr}
          </Base>,
        );

        jest.runAllTimers();
        wrapper.update();

        wrapper.find('.ant-typography-extend').simulate('click');
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find('p').text()).toEqual(fullStr);
      });
    });

    describe('copyable', () => {
      function copyTest(name, value, target) {
        it(name, () => {
          const wrapper = mount(
            <Base component="p" copyable={value}>
              test copy
            </Base>,
          );

          wrapper
            .find('.ant-typography-copy')
            .first()
            .simulate('click');
          expect(copy.lastStr).toEqual(target);

          expect(wrapper.find('.anticon-check').length).toBeTruthy();

          jest.runAllTimers();
          wrapper.update();

          // Will set back when 3 seconds pass
          expect(wrapper.find('.anticon-check').length).toBeFalsy();
        });
      }

      copyTest('basic copy', true, 'test copy');
      copyTest('customize copy', 'bamboo', 'bamboo');
    });

    describe('editable', () => {
      function testStep(name, submitFunc, expectFunc) {
        it(name, () => {
          const onChange = jest.fn();

          const wrapper = mount(
            <Paragraph onChange={onChange} editable>
              Bamboo
            </Paragraph>,
          );

          wrapper
            .find('.ant-typography-edit')
            .first()
            .simulate('click');

          wrapper.find('TextArea').simulate('change', {
            target: { value: 'Bamboo' },
          });

          submitFunc(wrapper);

          if (expectFunc) {
            expectFunc(onChange);
          } else {
            expect(onChange).toBeCalledWith('Bamboo');
            expect(onChange).toHaveBeenCalledTimes(1);
          }
        });
      }

      testStep('by key up', wrapper => {
        // Not trigger when inComposition
        wrapper.find('TextArea').simulate('compositionStart');
        wrapper.find('TextArea').simulate('keyDown', { keyCode: KeyCode.ENTER });
        wrapper.find('TextArea').simulate('compositionEnd');
        wrapper.find('TextArea').simulate('keyUp', { keyCode: KeyCode.ENTER });

        // Now trigger
        wrapper.find('TextArea').simulate('keyDown', { keyCode: KeyCode.ENTER });
        wrapper.find('TextArea').simulate('keyUp', { keyCode: KeyCode.ENTER });
      });

      testStep(
        'by esc key',
        wrapper => {
          wrapper.find('TextArea').simulate('keyDown', { keyCode: KeyCode.ESC });
          wrapper.find('TextArea').simulate('keyUp', { keyCode: KeyCode.ESC });
        },
        onChange => {
          expect(onChange).not.toBeCalled();
        },
      );

      testStep('by blur', wrapper => {
        wrapper.find('TextArea').simulate('blur');
      });
    });
  });
});
