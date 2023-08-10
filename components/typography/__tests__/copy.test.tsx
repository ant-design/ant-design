import { LikeOutlined, SmileOutlined } from '@ant-design/icons';
import * as copyObj from 'copy-to-clipboard';
import React from 'react';
import { fireEvent, render, waitFakeTimer, waitFor } from '../../../tests/utils';

import Base from '../Base';

describe('Typography copy', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
  });

  describe('Base', () => {
    describe('copyable', () => {
      function copyTest({
        name,
        icon,
        tooltips,
        iconClassNames = [],
        iconTexts = [],
        tooltipTexts = [],
        tooltipLength,
      }: {
        name: string;
        icon?: boolean | React.ReactNode;
        tooltips?: boolean | React.ReactNode;
        iconClassNames?: string[];
        iconTexts?: string[];
        tooltipTexts?: string[];
        tooltipLength?: number;
      }) {
        it(name, async () => {
          jest.useFakeTimers();
          const { container, unmount } = render(
            <Base component="p" copyable={{ icon, tooltips }}>
              test copy
            </Base>,
          );

          if (iconClassNames[0] !== undefined) {
            expect(container.querySelector(iconClassNames[0])).not.toBeNull();
          }
          if (iconTexts[0] !== undefined) {
            expect(container.querySelectorAll('.ant-typography-copy')[0].textContent).toBe(
              iconTexts[0],
            );
          }

          fireEvent.mouseEnter(container.querySelectorAll('.ant-typography-copy')[0]);
          await waitFakeTimer();

          if (tooltipTexts[0] !== undefined) {
            await waitFor(() => {
              expect(container.querySelector('.ant-tooltip-inner')?.textContent).toBe(
                tooltipTexts[0],
              );
            });
          }

          if (tooltipLength !== undefined) {
            await waitFor(() => {
              expect(container.querySelectorAll('.ant-tooltip-inner').length).toBe(tooltipLength);
            });
          }

          fireEvent.click(container.querySelectorAll('.ant-typography-copy')[0]);
          jest.useRealTimers();
          if (iconClassNames[1] !== undefined) {
            expect(container.querySelector(iconClassNames[1])).not.toBeNull();
          }
          fireEvent.mouseEnter(container.querySelectorAll('.ant-typography-copy')[0]);

          fireEvent.mouseEnter(container.querySelectorAll('.ant-typography-copy')[0]);

          if (tooltipTexts[1] !== undefined) {
            const expectedInner = tooltipTexts[1] === '' ? tooltipTexts[0] : tooltipTexts[1];
            await waitFor(() => {
              expect(container.querySelector('.ant-tooltip-inner')?.textContent).toBe(
                expectedInner,
              );
            });
          }

          if (iconTexts[1] !== undefined) {
            expect(container.querySelectorAll('.ant-typography-copy')[0].textContent).toBe(
              iconTexts[1],
            );
          }

          jest.useFakeTimers();
          fireEvent.click(container.querySelectorAll('.ant-typography-copy')[0]);
          await waitFakeTimer();

          unmount();
          jest.useRealTimers();
        });
      }

      const dom = (
        <>
          <span>1</span>2
        </>
      );
      const dom2 = (
        <>
          <span>3</span>4
        </>
      );
      const copy = '.anticon-copy';
      const check = '.anticon-check';

      copyTest({
        name: 'icon basic copy',
        iconClassNames: [copy, check],
        tooltipTexts: ['Copy', 'Copied'],
      });
      copyTest({ name: 'icon true', icon: true, iconClassNames: [copy, check] });
      copyTest({ name: 'icon two true', icon: [true, true], iconClassNames: [copy, check] });
      copyTest({ name: 'icon false', icon: false, iconClassNames: [copy, check] });
      copyTest({ name: 'icon custom text', icon: ['a', 'b'], iconTexts: ['a', 'b'] });
      copyTest({ name: 'icon custom element', icon: [dom, dom2], iconTexts: ['12', '34'] });
      copyTest({
        name: 'icon custom icon',
        icon: <SmileOutlined />,
        iconClassNames: ['.anticon-smile', check],
      });
      copyTest({
        name: 'icon custom icon2',
        icon: [<SmileOutlined key="a" />, <LikeOutlined key="b" />],
        iconClassNames: ['.anticon-smile', '.anticon-like'],
      });
      copyTest({
        name: 'icon custom icon3',
        icon: [
          <>
            <SmileOutlined />
            <SmileOutlined />
          </>,
          <LikeOutlined key="b" />,
        ],
        iconClassNames: ['.anticon-smile', '.anticon-like'],
      });
      copyTest({
        name: 'icon custom icon4',
        icon: (
          <>
            <SmileOutlined />
            <LikeOutlined />
          </>
        ),
        iconClassNames: ['.anticon-smile', check],
      });
      copyTest({
        name: 'icon custom icon5',
        icon: (
          <>
            <SmileOutlined />
            <LikeOutlined />
          </>
        ),
        iconClassNames: ['.anticon-like', check],
      });
      copyTest({
        name: 'tooltips true',
        tooltips: true,
        tooltipLength: 1,
        tooltipTexts: ['Copy', 'Copied'],
      });
      copyTest({ name: 'tooltips false', tooltips: false, tooltipLength: 0 });
      copyTest({
        name: 'tooltips custom text',
        tooltips: ['a', 'b'],
        tooltipLength: 1,
        tooltipTexts: ['a', 'b'],
      });
      copyTest({
        name: 'tooltips custom element ',
        tooltips: [dom, dom2],
        tooltipTexts: ['12', '34'],
      });
      copyTest({
        name: 'tooltips first empty',
        tooltips: ['', 'xxx'],
        tooltipLength: 0,
      });
      copyTest({
        name: 'tooltips first empty 2',
        tooltips: [''],
        tooltipLength: 0,
      });

      copyTest({
        name: 'tooltips true true',
        tooltips: [true, true],
        tooltipTexts: ['Copy', 'Copied'],
      });
      copyTest({
        name: 'tooltips true false',
        tooltips: [true, false],
        tooltipTexts: ['Copy', ''],
      });

      copyTest({
        name: 'tooltips false true',
        tooltips: [false, true],
        tooltipLength: 0,
      });
    });

    it('copy click event stopPropagation', () => {
      const onDivClick = jest.fn();
      const { container: wrapper } = render(
        <div onClick={onDivClick}>
          <Base component="p" copyable>
            test copy
          </Base>
        </div>,
      );
      fireEvent.click(wrapper.querySelectorAll('.ant-typography-copy')[0]);
      expect(onDivClick).not.toHaveBeenCalled();
    });

    it('the first parameter of onCopy is the click event', () => {
      function onCopy(e: React.MouseEvent<HTMLDivElement>) {
        expect(e).not.toBeUndefined();
      }

      const { container: wrapper } = render(
        <Base component="p" copyable={{ onCopy }}>
          test copy
        </Base>,
      );
      fireEvent.click(wrapper.querySelectorAll('.ant-typography-copy')[0]);
    });

    it('copy to clipboard', async () => {
      jest.useFakeTimers();
      const spy = jest.spyOn(copyObj, 'default');
      const originText = 'origin text.';
      const nextText = 'next text.';
      const Test = () => {
        const [dynamicText, setDynamicText] = React.useState(originText);
        React.useEffect(() => {
          setTimeout(() => {
            setDynamicText(nextText);
          }, 500);
        }, []);
        return (
          <Base component="p" copyable>
            {dynamicText}
          </Base>
        );
      };
      const { container: wrapper } = render(<Test />);
      const copyBtn = wrapper.querySelectorAll('.ant-typography-copy')[0];
      fireEvent.click(copyBtn);
      expect(spy.mock.calls[0][0]).toEqual(originText);
      await waitFakeTimer();
      spy.mockReset();
      fireEvent.click(copyBtn);
      expect(spy.mock.calls[0][0]).toEqual(nextText);
      jest.useRealTimers();
    });
  });
});
