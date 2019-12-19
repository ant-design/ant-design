import React from 'react';
import { mount } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';
import copy from 'copy-to-clipboard';
import Title from '../Title';
import Paragraph from '../Paragraph';
import Base from '../Base'; // eslint-disable-line import/no-named-as-default
import mountTest from '../../../tests/shared/mountTest';
import Typography from '../Typography';

jest.mock('copy-to-clipboard');

describe('Typography', () => {
  mountTest(Paragraph);
  mountTest(Base);
  mountTest(Title);

  const LINE_STR_COUNT = 20;
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  // Mock offsetHeight
  const originOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
    .get;
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    get() {
      let html = this.innerHTML;
      html = html.replace(/<[^>]*>/g, '');
      const lines = Math.ceil(html.length / LINE_STR_COUNT);
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

      expect(errorSpy).toHaveBeenCalledWith(
        'Warning: Title only accept `1 | 2 | 3 | 4` as `level` value.',
      );
    });
  });

  describe('Base', () => {
    describe('trigger ellipsis update', () => {
      const fullStr =
        'Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light';

      it('should trigger update', () => {
        const wrapper = mount(
          <Base ellipsis component="p" editable>
            {fullStr}
          </Base>,
        );

        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find('span').text()).toEqual('Bamboo is Little ...');

        wrapper.setProps({ ellipsis: { rows: 2 } });
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find('span').text()).toEqual('Bamboo is Little Light Bamboo is Litt...');

        wrapper.setProps({ ellipsis: { rows: 99 } });
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find('p').text()).toEqual(fullStr);

        wrapper.unmount();
      });

      it('connect children', () => {
        const bamboo = 'Bamboo';
        const is = ' is ';

        const wrapper = mount(
          <Base ellipsis component="p" editable>
            {bamboo}
            {is}
            <code>Little</code>
            <code>Light</code>
          </Base>,
        );

        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find('span').text()).toEqual('Bamboo is Little...');
      });

      it('should expandable work', () => {
        const onExpand = jest.fn();
        const wrapper = mount(
          <Base ellipsis={{ expandable: true, onExpand }} component="p" copyable editable>
            {fullStr}
          </Base>,
        );

        jest.runAllTimers();
        wrapper.update();

        wrapper.find('.ant-typography-expand').simulate('click');
        expect(onExpand).toHaveBeenCalled();
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find('p').text()).toEqual(fullStr);
      });

      it('can use css ellipsis', () => {
        const wrapper = mount(<Base ellipsis component="p" />);
        expect(wrapper.find('.ant-typography-ellipsis-single-line').length).toBeTruthy();
      });
    });

    describe('copyable', () => {
      function copyTest(name, text, target) {
        it(name, () => {
          const onCopy = jest.fn();
          const wrapper = mount(
            <Base component="p" copyable={{ text, onCopy }}>
              test copy
            </Base>,
          );

          wrapper
            .find('.ant-typography-copy')
            .first()
            .simulate('click');
          expect(copy.lastStr).toEqual(target);

          wrapper.update();
          expect(onCopy).toHaveBeenCalled();

          expect(wrapper.find('.anticon-check').length).toBeTruthy();

          jest.runAllTimers();
          wrapper.update();

          // Will set back when 3 seconds pass
          expect(wrapper.find('.anticon-check').length).toBeFalsy();
        });
      }

      copyTest('basic copy', undefined, 'test copy');
      copyTest('customize copy', 'bamboo', 'bamboo');
    });

    describe('editable', () => {
      function testStep(name, submitFunc, expectFunc) {
        it(name, () => {
          const onStart = jest.fn();
          const onChange = jest.fn();

          const className = 'test';
          const style = {};

          const wrapper = mount(
            <Paragraph editable={{ onChange, onStart }} className={className} style={style}>
              Bamboo
            </Paragraph>,
          );

          wrapper
            .find('.ant-typography-edit')
            .first()
            .simulate('click');

          expect(onStart).toHaveBeenCalled();

          // Should have className
          const props = wrapper.find('div').props();
          expect(props.style).toEqual(style);
          expect(props.className.includes(className)).toBeTruthy();

          wrapper.find('TextArea').simulate('change', {
            target: { value: 'Bamboo' },
          });

          submitFunc(wrapper);

          if (expectFunc) {
            expectFunc(onChange);
          } else {
            expect(onChange).toHaveBeenCalledWith('Bamboo');
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
          // eslint-disable-next-line
          expect(onChange).not.toHaveBeenCalled();
        },
      );

      testStep('by blur', wrapper => {
        wrapper.find('TextArea').simulate('blur');
      });
    });
  });

  it('warning if use setContentRef', () => {
    function refFunc() {}
    mount(<Typography setContentRef={refFunc} />);

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Typography] `setContentRef` is deprecated. Please use `ref` instead.',
    );
  });
});
