import React from 'react';
import { GetProp } from 'antd/es/_util/type';

import FloatButton, { FloatButtonGroupProps } from '..';
import { render } from '../../../tests/utils';
import type { FloatButtonSemanticName } from '../FloatButton';

describe('FloatButton.Semantic', () => {
  it('FloatButton', () => {
    const classNames: Record<FloatButtonSemanticName, string> = {
      root: 'custom-root',
      icon: 'custom-icon',
      content: 'custom-content',
    };

    const classNamesTargets: Record<FloatButtonSemanticName, string> = {
      root: 'ant-float-btn',
      icon: 'ant-float-btn-icon',
      content: 'ant-float-btn-content',
    };

    const styles: Record<FloatButtonSemanticName, Record<string, any>> = {
      root: { color: 'red' },
      icon: { color: 'blue' },
      content: { color: 'green' },
    };

    const { container } = render(
      <FloatButton icon="little" content="bamboo" classNames={classNames} styles={styles} />,
    );

    Object.keys(classNames).forEach((key) => {
      const className = classNames[key as FloatButtonSemanticName];
      const oriClassName = classNamesTargets[key as FloatButtonSemanticName];
      const style = styles[key as FloatButtonSemanticName];

      const element = container.querySelector<HTMLElement>(`.${className}`);
      expect(element).toBeTruthy();
      expect(element).toHaveClass(oriClassName);
      expect(element).toHaveStyle(style);
    });
  });

  it('Group', () => {
    const classNames: Required<GetProp<FloatButtonGroupProps, 'classNames'>> = {
      root: 'custom-root',
      list: 'custom-list',
      item: 'custom-item',
      itemIcon: 'custom-item-icon',
      itemContent: 'custom-item-content',
      trigger: 'custom-trigger-root',
      triggerIcon: 'custom-trigger-icon',
      triggerContent: 'custom-trigger-content',
    };

    const classNamesTargets = {
      root: '.ant-float-btn-group',
      list: '.ant-float-btn-group-list',
      item: '.ant-float-btn-group-list .ant-float-btn',
      itemIcon: '.ant-float-btn-group-list .ant-float-btn-icon',
      itemContent: '.ant-float-btn-group-list .ant-float-btn-content',

      trigger: '.ant-float-btn-group-trigger',
      triggerIcon: '.ant-float-btn-group-trigger .ant-float-btn-icon',
      triggerContent: '.ant-float-btn-group-trigger .ant-float-btn-content',
    };

    const styles: Required<GetProp<FloatButtonGroupProps, 'styles'>> = {
      root: { color: 'red' },
      list: { color: 'blue' },
      item: { color: 'green' },
      itemIcon: { color: 'yellow' },
      itemContent: { color: 'purple' },
      trigger: { color: 'orange' },
      triggerIcon: { color: 'pink' },
      triggerContent: { color: 'cyan' },
    };

    const { container } = render(
      <FloatButton.Group
        open
        icon="little"
        content="bamboo"
        classNames={classNames}
        styles={styles}
        trigger="click"
      >
        <FloatButton icon="little" content="bamboo" />
      </FloatButton.Group>,
    );

    Object.keys(classNamesTargets).forEach((key) => {
      const cells = key.split('.');

      const classNamesObj: any = cells.length === 1 ? classNames : (classNames as any)[cells[0]];
      const stylesObj: any = cells.length === 1 ? styles : (styles as any)[cells[0]];
      const name = cells[cells.length - 1];

      const oriClassName = classNamesTargets[key as keyof typeof classNamesTargets];
      const className = classNamesObj[name];
      const style = stylesObj[name];

      const element = container.querySelector<HTMLElement>(oriClassName);
      expect(element).toBeTruthy();
      expect(element).toHaveClass(className);
      expect(element).toHaveStyle(style);
    });
  });
});
