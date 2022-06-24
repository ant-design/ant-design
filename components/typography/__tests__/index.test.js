import { CheckOutlined, HighlightOutlined, LikeOutlined, SmileOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import KeyCode from 'rc-util/lib/KeyCode';
import { resetWarned } from 'rc-util/lib/warning';
import React from 'react';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, sleep, waitFor } from '../../../tests/utils';
import Base from '../Base';
import Link from '../Link';
import Paragraph from '../Paragraph';
import Text from '../Text';
import Title from '../Title';
import Typography from '../Typography';

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
  const originOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight',
  ).get;

  const mockGetBoundingClientRect = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect');

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get() {
        let html = this.innerHTML;
        html = html.replace(/<[^>]*>/g, '');
        const lines = Math.ceil(html.length / LINE_STR_COUNT);
        return lines * 16;
      },
    });
    mockGetBoundingClientRect.mockImplementation(function fn() {
      let html = this.innerHTML;
      html = html.replace(/<[^>]*>/g, '');
      const lines = Math.ceil(html.length / LINE_STR_COUNT);
      return { height: lines * 16 };
    });
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
    mockGetBoundingClientRect.mockRestore();
    window.getComputedStyle = originGetComputedStyle;
  });

  describe('Title', () => {
    it('warning if `level` not correct', () => {
      render(<Title level={false} />);

      expect(errorSpy).toHaveBeenCalledWith(
        'Warning: [antd: Typography.Title] Title only accept `1 | 2 | 3 | 4 | 5` as `level` value. And `5` need 4.6.0+ version.',
      );
    });
  });

  describe('Base', () => {
    describe('copyable', () => {
      function copyTest(name, text, target, icon, tooltips, format) {
        it(name, async () => {
          jest.useFakeTimers();
          const onCopy = jest.fn();
          const { container: wrapper, unmount } = render(
            <Base component="p" copyable={{ text, onCopy, icon, tooltips, format }}>
              test copy
            </Base>,
          );

          if (icon) {
            expect(wrapper.querySelectorAll('.anticon-smile').length).toBeGreaterThan(0);
          } else {
            expect(wrapper.querySelectorAll('.anticon-copy').length).toBeGreaterThan(0);
          }

          fireEvent.mouseEnter(wrapper.querySelector('.ant-typography-copy'));
          jest.runAllTimers();

          if (tooltips === undefined || tooltips === true) {
            await waitFor(() => {
              expect(wrapper.querySelector('.ant-tooltip-inner').textContent).toBe('Copy');
            });
          } else if (tooltips === false) {
            await waitFor(() => {
              expect(wrapper.querySelectorAll('.ant-tooltip-inner').length).toBe(0);
            });
          } else if (tooltips[0] === '' && tooltips[1] === '') {
            await waitFor(() => {
              expect(wrapper.querySelectorAll('.ant-tooltip-inner').length).toBe(0);
            });
          } else if (tooltips[0] === '' && tooltips[1]) {
            await waitFor(() => {
              expect(wrapper.querySelectorAll('.ant-tooltip-inner').length).toBe(0);
            });
          } else if (tooltips[1] === '' && tooltips[0]) {
            await waitFor(() => {
              expect(wrapper.querySelector('.ant-tooltip-inner').textContent).toBe(tooltips[0]);
            });
          } else {
            await waitFor(() => {
              expect(wrapper.querySelector('.ant-tooltip-inner').textContent).toBe(tooltips[0]);
            });
          }

          fireEvent.click(wrapper.querySelector('.ant-typography-copy'));
          jest.useRealTimers();
          fireEvent.mouseEnter(wrapper.querySelectorAll('.ant-typography-copy')[0]);
          // tooltips 为 ['', 'xxx'] 时，切换时需要延时 mouseEnterDelay 的时长
          if (tooltips && tooltips[0] === '' && tooltips[1]) {
            await sleep(150);
          }

          expect(copy.lastStr).toEqual(target);
          expect(copy.lastOptions.format).toEqual(format);
          expect(onCopy).toHaveBeenCalled();

          let copiedIcon = '.anticon-check';
          if (icon && icon.length > 1) {
            copiedIcon = '.anticon-like';
          } else {
            copiedIcon = '.anticon-check';
          }

          expect(wrapper.querySelectorAll(copiedIcon).length).toBeGreaterThan(0);
          fireEvent.mouseEnter(wrapper.querySelectorAll('.ant-typography-copy')[0]);

          if (tooltips === undefined || tooltips === true) {
            await waitFor(() => {
              expect(wrapper.querySelector('.ant-tooltip-inner').textContent).toBe('Copied');
            });
          } else if (tooltips === false) {
            await waitFor(() => {
              expect(wrapper.querySelectorAll('.ant-tooltip-inner').length).toBe(0);
            });
          } else if (tooltips[0] === '' && tooltips[1] === '') {
            await waitFor(() => {
              expect(wrapper.querySelectorAll('.ant-tooltip-inner').length).toBe(0);
            });
          } else if (tooltips[0] === '' && tooltips[1]) {
            await waitFor(() => {
              expect(wrapper.querySelector('.ant-tooltip-inner').textContent).toBe(tooltips[1]);
            });
          } else if (tooltips[1] === '' && tooltips[0]) {
            await waitFor(() => {
              expect(wrapper.querySelector('.ant-tooltip-inner').textContent).toBe('');
            });
          } else {
            await waitFor(() => {
              expect(wrapper.querySelector('.ant-tooltip-inner').textContent).toBe(tooltips[1]);
            });
          }

          jest.useFakeTimers();
          fireEvent.click(wrapper.querySelectorAll('.ant-typography-copy')[0]);
          jest.runAllTimers();

          // Will set back when 3 seconds pass
          await sleep(3000);
          expect(wrapper.querySelectorAll(copiedIcon).length).toBe(0);
          unmount();
          jest.useRealTimers();
        });
      }

      copyTest('basic copy', undefined, 'test copy');
      copyTest('customize copy', 'bamboo', 'bamboo');
      copyTest(
        'costomize copy with plain text',
        'bamboo',
        'bamboo',
        undefined,
        undefined,
        'text/plain',
      );
      copyTest(
        'costomize copy with html text',
        'bamboo',
        'bamboo',
        undefined,
        undefined,
        'text/html',
      );
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
      function testStep(
        { name = '', icon, tooltip, triggerType, enterIcon },
        submitFunc,
        expectFunc,
      ) {
        it(name, async () => {
          jest.useFakeTimers();
          const onStart = jest.fn();
          const onChange = jest.fn();

          const className = 'test';
          const style = { padding: 'unset' };

          const { container: wrapper } = render(
            <Paragraph
              editable={{ onChange, onStart, icon, tooltip, triggerType, enterIcon }}
              className={className}
              style={style}
            >
              Bamboo
            </Paragraph>,
          );

          if (triggerType === undefined || triggerType.indexOf('icon') !== -1) {
            if (icon) {
              expect(wrapper.querySelectorAll('.anticon-highlight').length).toBeGreaterThan(0);
            } else {
              expect(wrapper.querySelectorAll('.anticon-edit').length).toBeGreaterThan(0);
            }

            if (triggerType === undefined || triggerType.indexOf('text') === -1) {
              fireEvent.click(wrapper.firstChild);
              expect(onStart).not.toHaveBeenCalled();
            }
            fireEvent.mouseEnter(wrapper.querySelectorAll('.ant-typography-edit')[0]);
            jest.runAllTimers();

            if (tooltip === undefined || tooltip === true) {
              await waitFor(() => {
                expect(wrapper.querySelector('.ant-tooltip-inner').textContent).toBe('Edit');
              });
            } else if (tooltip === false) {
              await waitFor(() => {
                expect(wrapper.querySelectorAll('.ant-tooltip-inner').length).toBe(0);
              });
            } else {
              await waitFor(() => {
                expect(wrapper.querySelector('.ant-tooltip-inner').textContent).toBe(tooltip);
              });
            }

            fireEvent.click(wrapper.querySelectorAll('.ant-typography-edit')[0]);

            expect(onStart).toHaveBeenCalled();
            if (triggerType !== undefined && triggerType.indexOf('text') !== -1) {
              fireEvent.keyDown(wrapper.querySelector('textarea'), { keyCode: KeyCode.ESC });
              fireEvent.keyUp(wrapper.querySelector('textarea'), { keyCode: KeyCode.ESC });
              expect(onChange).not.toHaveBeenCalled();
            }
          }

          if (triggerType !== undefined && triggerType.indexOf('text') !== -1) {
            if (triggerType.indexOf('icon') === -1) {
              expect(wrapper.querySelectorAll('.anticon-highlight').length).toBe(0);
              expect(wrapper.querySelectorAll('.anticon-edit').length).toBe(0);
            }
            fireEvent.click(wrapper.firstChild);
            expect(onStart).toHaveBeenCalled();
          }

          // Should have className
          const props = wrapper.querySelectorAll('div')[0];
          expect(props.getAttribute('style')).toContain('padding: unset');
          expect(props.className.includes(className)).toBeTruthy();

          fireEvent.change(wrapper.querySelector('textarea'), {
            target: { value: 'Bamboo' },
          });

          if (enterIcon === undefined) {
            expect(
              wrapper.querySelectorAll('span.ant-typography-edit-content-confirm')[0].className,
            ).toContain('anticon-enter');
          } else if (enterIcon === null) {
            expect(
              wrapper.querySelectorAll('span.ant-typography-edit-content-confirm').length,
            ).toBe(0);
          } else {
            expect(
              wrapper.querySelectorAll('span.ant-typography-edit-content-confirm')[0].className,
            ).not.toContain('anticon-enter');
          }

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

      testStep({ name: 'by key up' }, wrapper => {
        // Not trigger when inComposition
        fireEvent.compositionStart(wrapper.querySelector('textarea'));
        fireEvent.keyDown(wrapper.querySelector('textarea'), { keyCode: KeyCode.ENTER });
        fireEvent.compositionEnd(wrapper.querySelector('textarea'));
        fireEvent.keyUp(wrapper.querySelector('textarea'), { keyCode: KeyCode.ENTER });

        // Now trigger
        fireEvent.keyDown(wrapper.querySelector('textarea'), { keyCode: KeyCode.ENTER });
        fireEvent.keyUp(wrapper.querySelector('textarea'), { keyCode: KeyCode.ENTER });
      });

      testStep(
        { name: 'by esc key' },
        wrapper => {
          fireEvent.keyDown(wrapper.querySelector('textarea'), { keyCode: KeyCode.ESC });
          fireEvent.keyUp(wrapper.querySelector('textarea'), { keyCode: KeyCode.ESC });
        },
        onChange => {
          // eslint-disable-next-line jest/no-standalone-expect
          expect(onChange).not.toHaveBeenCalled();
        },
      );

      testStep({ name: 'by blur' }, wrapper => {
        fireEvent.blur(wrapper.querySelector('textarea'));
      });

      testStep({ name: 'customize edit icon', icon: <HighlightOutlined /> });
      testStep({ name: 'customize edit show tooltip', tooltip: true });
      testStep({ name: 'customize edit hide tooltip', tooltip: false });
      testStep({ name: 'customize edit tooltip text', tooltip: 'click to edit text' });
      testStep({ name: 'enter icon - default', enterIcon: undefined });
      testStep({ name: 'enter icon - null', enterIcon: null });
      testStep({ name: 'enter icon - custom', enterIcon: <CheckOutlined /> });

      testStep({ name: 'trigger by icon', triggerType: ['icon'] });
      testStep({ name: 'trigger by text', triggerType: ['text'] });
      testStep({ name: 'trigger by both icon and text', triggerType: ['icon', 'text'] });

      it('should trigger onEnd when type Enter', () => {
        const onEnd = jest.fn();
        const { container: wrapper } = render(<Paragraph editable={{ onEnd }}>Bamboo</Paragraph>);
        fireEvent.click(wrapper.querySelectorAll('.ant-typography-edit')[0]);
        fireEvent.keyDown(wrapper.querySelector('textarea'), { keyCode: KeyCode.ENTER });
        fireEvent.keyUp(wrapper.querySelector('textarea'), { keyCode: KeyCode.ENTER });
        expect(onEnd).toHaveBeenCalledTimes(1);
      });

      it('should trigger onCancel when type ESC', () => {
        const onCancel = jest.fn();
        const { container: wrapper } = render(
          <Paragraph editable={{ onCancel }}>Bamboo</Paragraph>,
        );
        fireEvent.click(wrapper.querySelectorAll('.ant-typography-edit')[0]);
        fireEvent.keyDown(wrapper.querySelector('textarea'), { keyCode: KeyCode.ESC });
        fireEvent.keyUp(wrapper.querySelector('textarea'), { keyCode: KeyCode.ESC });
        expect(onCancel).toHaveBeenCalledTimes(1);
      });

      it('should only trigger focus on the first time', () => {
        let triggerTimes = 0;
        const { container: wrapper } = render(<Paragraph editable>Bamboo</Paragraph>);
        const editIcon = wrapper.querySelectorAll('.ant-typography-edit')[0];

        editIcon.addEventListener('focus', () => {
          triggerTimes += 1;
        });

        fireEvent.focus(editIcon);
        expect(triggerTimes).toEqual(1);

        fireEvent.click(editIcon);
        expect(triggerTimes).toEqual(1);

        fireEvent.change(wrapper.querySelector('textarea'), {
          target: { value: 'good' },
        });

        expect(triggerTimes).toEqual(1);
      });
    });

    it('should focus at the end of textarea', () => {
      const { container: wrapper } = render(<Paragraph editable>content</Paragraph>);
      fireEvent.click(wrapper.querySelectorAll('.ant-typography-edit')[0]);
      const textareaNode = wrapper.querySelector('textarea');
      expect(textareaNode.selectionStart).toBe(7);
      expect(textareaNode.selectionEnd).toBe(7);
    });
  });

  it('warning if use setContentRef', () => {
    const refFunc = () => {};
    render(<Typography setContentRef={refFunc} />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Typography] `setContentRef` is deprecated. Please use `ref` instead.',
    );
  });

  it('no italic warning', () => {
    resetWarned();
    render(<Text italic>Little</Text>);

    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('should get HTMLHeadingElement ref from Title', () => {
    const ref = React.createRef();

    render(<Title level={1} ref={ref} />);
    expect(ref.current instanceof HTMLHeadingElement).toBe(true);
  });

  it('should get HTMLDivElement ref from Paragraph', () => {
    const ref = React.createRef();

    render(<Paragraph ref={ref} />);
    expect(ref.current instanceof HTMLDivElement).toBe(true);
  });

  it('should get HTMLSpanElement ref from Text', () => {
    const ref = React.createRef();

    render(<Text ref={ref} />);
    expect(ref.current instanceof HTMLSpanElement).toBe(true);
  });
});
