import React from 'react';
import { render } from '../../../tests/utils';
import Menu from '..';

// 测试在 Menu.Item 和 Menu.SubMenu 中使用块级元素作为 label 时的显示情况
describe('Menu Title Content Display', () => {
  // 测试不同模式下的显示情况
  const testModes = ['inline', 'vertical', 'horizontal'] as const;

  // 创建一个块级元素作为 label
  const BlockLevelLabel: React.FC = () => (
    <div style={{ display: 'block', padding: '4px 8px', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
      <div>Block Level Title</div>
      <div>With Multiple Lines</div>
    </div>
  );

  testModes.forEach((mode) => {
    it(`should display block level label correctly in ${mode} mode`, () => {
      const { container } = render(
        <Menu
          mode={mode}
          items={[
            {
              key: '1',
              label: <BlockLevelLabel />,
            },
            {
              key: '2',
              label: <BlockLevelLabel />,
              children: [
                { key: '2-1', label: 'Sub Item 1' },
                { key: '2-2', label: 'Sub Item 2' },
              ],
            },
          ]}
        />,
      );

      // 验证标题内容元素是否存在且具有正确的 display 属性
      const titleContentElements = container.querySelectorAll('.ant-menu-title-content');
      expect(titleContentElements.length).toBeGreaterThan(0);

      // 检查每个标题内容元素的 display 属性是否为 inline-block
      titleContentElements.forEach((element) => {
        const computedStyle = window.getComputedStyle(element);
        expect(computedStyle.display).toBe('inline-block');
      });

      // 验证块级元素是否正确渲染且没有错位
      const blockLabels = container.querySelectorAll(
        '.ant-menu-title-content > div[style*="display: block"]',
      );
      expect(blockLabels.length).toBeGreaterThan(0);
    });

    it(`should work with nested submenus in ${mode} mode`, () => {
      const { container } = render(
        <Menu
          mode={mode}
          items={[
            {
              key: '1',
              label: <BlockLevelLabel />,
              children: [
                {
                  key: '1-1',
                  label: <BlockLevelLabel />,
                },
                {
                  key: '1-2',
                  label: <BlockLevelLabel />,
                  children: [
                    { key: '1-2-1', label: 'Deep Sub Item 1' },
                    { key: '1-2-2', label: 'Deep Sub Item 2' },
                  ],
                },
              ],
            },
          ]}
        />,
      );

      // 验证所有标题内容元素是否都具有正确的 display 属性
      const titleContentElements = container.querySelectorAll('.ant-menu-title-content');
      expect(titleContentElements.length).toBeGreaterThan(0);

      titleContentElements.forEach((element) => {
        const computedStyle = window.getComputedStyle(element);
        expect(computedStyle.display).toBe('inline-block');
      });
    });
  });
});
