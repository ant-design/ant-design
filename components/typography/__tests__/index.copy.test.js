import React from 'react';
import { mount } from 'enzyme';
import Base from '../Base';
import { sleep } from '../../../tests/utils';

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
        iconClassName,
        iconTexts = [],
        tooltipTexts = [],
        tooltipLength,
      }) {
        it(name, async () => {
          jest.useFakeTimers();
          const wrapper = mount(<Base copyable={{ icon, tooltips }}>test copy</Base>);
          // icon
          if (iconClassName) {
            expect(wrapper.find(iconClassName).length).toBeTruthy();
          }
          if (iconTexts[0]) {
            expect(wrapper.find('.ant-typography-copy').at(0).text()).toBe(iconTexts[0]);
          }

          wrapper.find('.ant-typography-copy').first().simulate('mouseenter');
          jest.runAllTimers();
          wrapper.update();

          if (tooltipTexts[0]) {
            expect(wrapper.find('.ant-tooltip-inner').text()).toBe(tooltipTexts[0]);
          }

          if (tooltipLength !== undefined) {
            expect(wrapper.find('.ant-tooltip-inner').length).toBe(tooltipLength);
          }

          wrapper.find('.ant-typography-copy').first().simulate('click');
          jest.useRealTimers();
          wrapper.find('.ant-typography-copy').first().simulate('mouseenter');
          // tooltips 为 ['', 'xxx'] 时，切换时需要延时 mousenEnterDelay 的时长
          if (tooltips && tooltips[0] === '' && tooltips[1]) {
            await sleep(150);
          }

          wrapper.update();

          // let copiedIcon = '.anticon-check';
          // if (icon && icon.length > 1) {
          //   copiedIcon = '.anticon-like';
          // } else {
          //   copiedIcon = '.anticon-check';
          // }
          // expect(wrapper.find(copiedIcon).length).toBeTruthy();
          wrapper.find('.ant-typography-copy').first().simulate('mouseenter');

          if (tooltipTexts[1]) {
            expect(wrapper.find('.ant-tooltip-inner').text()).toBe(tooltipTexts[1]);
          }

          if (iconTexts[1]) {
            expect(wrapper.find('.ant-typography-copy').at(0).text()).toBe(iconTexts[1]);
          }

          jest.useFakeTimers();
          wrapper.find('.ant-typography-copy').first().simulate('click');
          jest.runAllTimers();
          wrapper.update();

          wrapper.unmount();
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

      copyTest({ name: 'icon basic copy', iconClassName: '.anticon-copy', tooltipText: 'Copy' });
      copyTest({ name: 'icon true', icon: true, iconClassName: '.anticon-copy' });
      copyTest({ name: 'icon false', icon: false, iconClassName: '.anticon-copy' });
      copyTest({ name: 'icon custom text', icon: ['a', 'b'], iconTexts: ['a', 'b'] });
      copyTest({ name: 'icon custom element', icon: [dom, dom2], iconTexts: ['12', '34'] });
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
    });
  });
});
