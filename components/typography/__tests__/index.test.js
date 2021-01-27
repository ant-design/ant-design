import React from 'react';
import { mount } from 'enzyme';
import { SmileOutlined, LikeOutlined, HighlightOutlined } from '@ant-design/icons';
import KeyCode from 'rc-util/lib/KeyCode';
import { spyElementPrototype } from 'rc-util/lib/test/domHook';
import copy from 'copy-to-clipboard';
import Title from '../Title';
import Link from '../Link';
import Paragraph from '../Paragraph';
import Base from '../Base';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import Typography from '../Typography';
import { sleep } from '../../../tests/utils';

jest.mock('copy-to-clipboard');

describe('Typography', () => {
  mountTest(Paragraph);
  mountTest(Base);
  mountTest(Title);
  mountTest(Link);

  rtlTest(Paragraph);
  rtlTest(Base);
  rtlTest(Title);
  rtlTest(Link);

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

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
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
        'Warning: [antd: Typography.Title] Title only accept `1 | 2 | 3 | 4 | 5` as `level` value. And `5` need 4.6.0+ version.',
      );
    });
  });

  describe('Base', () => {
    describe('trigger ellipsis update', () => {
      const fullStr =
        'Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light';

      it('should trigger update', async () => {
        const onEllipsis = jest.fn();
        const wrapper = mount(
          <Base ellipsis={{ onEllipsis }} component="p" editable>
            {fullStr}
          </Base>,
        );

        await sleep(20);
        wrapper.update();
        expect(wrapper.text()).toEqual('Bamboo is Little ...');
        expect(onEllipsis).toHaveBeenCalledWith(true);
        onEllipsis.mockReset();

        wrapper.setProps({ ellipsis: { rows: 2, onEllipsis } });
        await sleep(20);
        wrapper.update();
        expect(wrapper.text()).toEqual('Bamboo is Little Light Bamboo is Litt...');
        expect(onEllipsis).not.toHaveBeenCalled();

        wrapper.setProps({ ellipsis: { rows: 99, onEllipsis } });
        await sleep(20);
        wrapper.update();
        expect(wrapper.find('p').text()).toEqual(fullStr);
        expect(onEllipsis).toHaveBeenCalledWith(false);

        wrapper.unmount();
      });

      it('string with parentheses', async () => {
        const parenthesesStr = `Ant Design, a design language (for background applications, is refined by
          Ant UED Team. Ant Design, a design language for background applications,
          is refined by Ant UED Team. Ant Design, a design language for background
          applications, is refined by Ant UED Team. Ant Design, a design language
          for background applications, is refined by Ant UED Team. Ant Design, a
          design language for background applications, is refined by Ant UED Team.
          Ant Design, a design language for background applications, is refined by
          Ant UED Team.`;
        const onEllipsis = jest.fn();
        const wrapper = mount(
          <Base ellipsis={{ onEllipsis }} component="p" editable>
            {parenthesesStr}
          </Base>,
        );

        await sleep(20);
        wrapper.update();
        expect(wrapper.text()).toEqual('Ant Design, a des...');
        const ellipsisSpan = wrapper.find('span[title]');
        expect(ellipsisSpan.text()).toEqual('...');
        expect(ellipsisSpan.props().title)
          .toEqual(`ign language (for background applications, is refined by
          Ant UED Team. Ant Design, a design language for background applications,
          is refined by Ant UED Team. Ant Design, a design language for background
          applications, is refined by Ant UED Team. Ant Design, a design language
          for background applications, is refined by Ant UED Team. Ant Design, a
          design language for background applications, is refined by Ant UED Team.
          Ant Design, a design language for background applications, is refined by
          Ant UED Team.`);
        onEllipsis.mockReset();

        wrapper.unmount();
      });

      it('should middle ellipsis', async () => {
        const suffix = '--suffix';
        const wrapper = mount(
          <Base ellipsis={{ rows: 1, suffix }} component="p">
            {fullStr}
          </Base>,
        );

        await sleep(20);
        wrapper.update();
        expect(wrapper.find('p').text()).toEqual('Bamboo is...--suffix');
        wrapper.unmount();
      });

      it('should front or middle ellipsis', async () => {
        const suffix = '--The information is very important';
        const wrapper = mount(
          <Base ellipsis={{ rows: 1, suffix }} component="p">
            {fullStr}
          </Base>,
        );

        await sleep(20);
        wrapper.update();
        expect(wrapper.find('p').text()).toEqual('...--The information is very important');

        wrapper.setProps({ ellipsis: { rows: 2, suffix } });
        await sleep(20);
        wrapper.update();
        expect(wrapper.find('p').text()).toEqual('Ba...--The information is very important');

        wrapper.setProps({ ellipsis: { rows: 99, suffix } });
        await sleep(20);
        wrapper.update();
        expect(wrapper.find('p').text()).toEqual(fullStr + suffix);

        wrapper.unmount();
      });

      it('connect children', async () => {
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

        await sleep(20);
        wrapper.update();

        expect(wrapper.text()).toEqual('Bamboo is Little...');
      });

      it('should expandable work', async () => {
        const onExpand = jest.fn();
        const wrapper = mount(
          <Base ellipsis={{ expandable: true, onExpand }} component="p" copyable editable>
            {fullStr}
          </Base>,
        );

        await sleep(20);
        wrapper.update();

        wrapper.find('.ant-typography-expand').simulate('click');
        expect(onExpand).toHaveBeenCalled();
        await sleep(20);
        wrapper.update();

        expect(wrapper.find('p').text()).toEqual(fullStr);
      });

      it('should have custom expand style', async () => {
        const symbol = 'more';
        const wrapper = mount(
          <Base ellipsis={{ expandable: true, symbol }} component="p">
            {fullStr}
          </Base>,
        );
        await sleep(20);
        wrapper.update();
        expect(wrapper.find('.ant-typography-expand').text()).toEqual('more');
      });

      it('can use css ellipsis', () => {
        const wrapper = mount(<Base ellipsis component="p" />);
        expect(wrapper.find('.ant-typography-ellipsis-single-line').length).toBeTruthy();
      });

      describe('should tooltip support', () => {
        function getWrapper(tooltip) {
          return mount(
            <Base ellipsis={{ tooltip }} component="p">
              {fullStr}
            </Base>,
          );
        }

        it('boolean', async () => {
          const wrapper = getWrapper(true);
          await sleep(20);
          wrapper.update();

          expect(wrapper.find('Tooltip').prop('title')).toEqual(fullStr);
        });

        it('customize', async () => {
          const wrapper = getWrapper('Bamboo is Light');
          await sleep(20);
          wrapper.update();

          expect(wrapper.find('Tooltip').prop('title')).toEqual('Bamboo is Light');
        });
      });
    });

    describe('copyable', () => {
      function copyTest(name, text, target, icon, tooltips) {
        it(name, async () => {
          jest.useFakeTimers();
          const onCopy = jest.fn();
          const wrapper = mount(
            <Base component="p" copyable={{ text, onCopy, icon, tooltips }}>
              test copy
            </Base>,
          );

          if (icon) {
            expect(wrapper.find('.anticon-smile').length).toBeTruthy();
          } else {
            expect(wrapper.find('.anticon-copy').length).toBeTruthy();
          }

          wrapper.find('.ant-typography-copy').first().simulate('mouseenter');
          jest.runAllTimers();
          wrapper.update();

          if (tooltips === undefined || tooltips === true) {
            expect(wrapper.find('.ant-tooltip-inner').text()).toBe('Copy');
          } else if (tooltips === false) {
            expect(wrapper.find('.ant-tooltip-inner').length).toBeFalsy();
          } else if (tooltips[0] === '' && tooltips[1] === '') {
            expect(wrapper.find('.ant-tooltip-inner').length).toBeFalsy();
          } else if (tooltips[0] === '' && tooltips[1]) {
            expect(wrapper.find('.ant-tooltip-inner').length).toBeFalsy();
          } else if (tooltips[1] === '' && tooltips[0]) {
            expect(wrapper.find('.ant-tooltip-inner').text()).toBe(tooltips[0]);
          } else {
            expect(wrapper.find('.ant-tooltip-inner').text()).toBe(tooltips[0]);
          }

          wrapper.find('.ant-typography-copy').first().simulate('click');
          jest.useRealTimers();
          wrapper.find('.ant-typography-copy').first().simulate('mouseenter');
          // tooltips 为 ['', 'xxx'] 时，切换时需要延时 mousenEnterDelay 的时长
          if (tooltips && tooltips[0] === '' && tooltips[1]) {
            await sleep(150);
          }

          expect(copy.lastStr).toEqual(target);
          wrapper.update();
          expect(onCopy).toHaveBeenCalled();

          let copiedIcon = '.anticon-check';
          if (icon && icon.length > 1) {
            copiedIcon = '.anticon-like';
          } else {
            copiedIcon = '.anticon-check';
          }

          expect(wrapper.find(copiedIcon).length).toBeTruthy();
          wrapper.find('.ant-typography-copy').first().simulate('mouseenter');

          if (tooltips === undefined || tooltips === true) {
            expect(wrapper.find('.ant-tooltip-inner').text()).toBe('Copied');
          } else if (tooltips === false) {
            expect(wrapper.find('.ant-tooltip-inner').length).toBeFalsy();
          } else if (tooltips[0] === '' && tooltips[1] === '') {
            expect(wrapper.find('.ant-tooltip-inner').length).toBeFalsy();
          } else if (tooltips[0] === '' && tooltips[1]) {
            expect(wrapper.find('.ant-tooltip-inner').text()).toBe(tooltips[1]);
          } else if (tooltips[1] === '' && tooltips[0]) {
            expect(wrapper.find('.ant-tooltip-inner').text()).toBe('');
          } else {
            expect(wrapper.find('.ant-tooltip-inner').text()).toBe(tooltips[1]);
          }

          jest.useFakeTimers();
          jest.runAllTimers();
          wrapper.update();

          // Will set back when 3 seconds pass
          expect(wrapper.find(copiedIcon).length).toBeFalsy();
          wrapper.unmount();
          jest.useRealTimers();
        });
      }

      copyTest('basic copy', undefined, 'test copy');
      copyTest('customize copy', 'bamboo', 'bamboo');
      copyTest('customize copy icon', 'bamboo', 'bamboo', <SmileOutlined />);
      copyTest('customize copy icon by pass array', 'bamboo', 'bamboo', [
        <SmileOutlined key="copy-icon" />,
      ]);
      copyTest('customize copy icon and copied icon ', 'bamboo', 'bamboo', [
        <SmileOutlined key="copy-icon" />,
        <LikeOutlined key="copied-icon" />,
      ]);
      copyTest('customize copy show tooltips', 'bamboo', 'bamboo', undefined, true);
      copyTest('customize copy hide tooltips', 'bamboo', 'bamboo', undefined, false);
      copyTest('customize copy tooltips text', 'bamboo', 'bamboo', undefined, [
        'click here',
        'you clicked!!',
      ]);
      copyTest('tooltips contains two empty text', 'bamboo', 'bamboo', undefined, ['', '']);
      copyTest('tooltips contains one empty text', 'bamboo', 'bamboo', undefined, [
        '',
        'you clicked!!',
      ]);
      copyTest('tooltips contains one empty text 2', 'bamboo', 'bamboo', undefined, [
        'click here',
        '',
      ]);
    });

    describe('editable', () => {
      function testStep({ name = '', icon, tooltip } = {}, submitFunc, expectFunc) {
        it(name, () => {
          jest.useFakeTimers();
          const onStart = jest.fn();
          const onChange = jest.fn();

          const className = 'test';
          const style = {};

          const wrapper = mount(
            <Paragraph
              editable={{ onChange, onStart, icon, tooltip }}
              className={className}
              style={style}
            >
              Bamboo
            </Paragraph>,
          );

          if (icon) {
            expect(wrapper.find('.anticon-highlight').length).toBeTruthy();
          } else {
            expect(wrapper.find('.anticon-edit').length).toBeTruthy();
          }

          wrapper.find('.ant-typography-edit').first().simulate('mouseenter');
          jest.runAllTimers();
          wrapper.update();

          if (tooltip === undefined || tooltip === true) {
            expect(wrapper.find('.ant-tooltip-inner').text()).toBe('Edit');
          } else if (tooltip === false) {
            expect(wrapper.find('.ant-tooltip-inner').length).toBeFalsy();
          } else {
            expect(wrapper.find('.ant-tooltip-inner').text()).toBe(tooltip);
          }

          wrapper.find('.ant-typography-edit').first().simulate('click');

          expect(onStart).toHaveBeenCalled();

          // Should have className
          const props = wrapper.find('div').first().props();
          expect(props.style).toEqual(style);
          expect(props.className.includes(className)).toBeTruthy();

          wrapper.find('textarea').simulate('change', {
            target: { value: 'Bamboo' },
          });

          if (submitFunc) {
            submitFunc(wrapper);
          } else {
            return;
          }

          if (expectFunc) {
            expectFunc(onChange);
          } else {
            expect(onChange).toHaveBeenCalledWith('Bamboo');
            expect(onChange).toHaveBeenCalledTimes(1);
          }
        });
      }

      //   testStep({ name: 'by key up' }, wrapper => {
      //     // Not trigger when inComposition
      //     wrapper.find('textarea').simulate('compositionStart');
      //     wrapper.find('textarea').simulate('keyDown', { keyCode: KeyCode.ENTER });
      //     wrapper.find('textarea').simulate('compositionEnd');
      //     wrapper.find('textarea').simulate('keyUp', { keyCode: KeyCode.ENTER });

      //     // Now trigger
      //     wrapper.find('textarea').simulate('keyDown', { keyCode: KeyCode.ENTER });
      //     wrapper.find('textarea').simulate('keyUp', { keyCode: KeyCode.ENTER });
      //   });

      testStep(
        { name: 'by esc key' },
        wrapper => {
          wrapper.find('textarea').simulate('keyDown', { keyCode: KeyCode.ESC });
          wrapper.find('textarea').simulate('keyUp', { keyCode: KeyCode.ESC });
        },
        onChange => {
          // eslint-disable-next-line jest/no-standalone-expect
          expect(onChange).not.toHaveBeenCalled();
        },
      );

      testStep({ name: 'by blur' }, wrapper => {
        wrapper.find('textarea').simulate('blur');
      });

      testStep({ name: 'customize edit icon', icon: <HighlightOutlined /> });
      testStep({ name: 'customize edit show tooltip', tooltip: true });
      testStep({ name: 'customize edit hide tooltip', tooltip: false });
      testStep({ name: 'customize edit tooltip text', tooltip: 'click to edit text' });

      it('should only trigger focus on the first time', () => {
        let triggerTimes = 0;
        const mockFocus = spyElementPrototype(HTMLElement, 'focus', () => {
          triggerTimes += 1;
        });

        const wrapper = mount(<Paragraph editable>Bamboo</Paragraph>);

        wrapper.find('.ant-typography-edit').first().simulate('click');
        expect(triggerTimes).toEqual(1);

        wrapper.find('textarea').simulate('change', {
          target: { value: 'good' },
        });

        expect(triggerTimes).toEqual(1);

        mockFocus.mockRestore();
      });
    });

    it('should focus at the end of textarea', () => {
      const wrapper = mount(<Paragraph editable>content</Paragraph>);
      wrapper.find('.ant-typography-edit').first().simulate('click');
      const textareaNode = wrapper.find('textarea').getDOMNode();
      expect(textareaNode.selectionStart).toBe(7);
      expect(textareaNode.selectionEnd).toBe(7);
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
