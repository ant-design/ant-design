import React from 'react';
import { GetProp } from 'antd/es/_util/type';

import FloatButton, { FloatButtonGroupProps } from '..';
import { render } from '../../../tests/utils';
import type { FloatButtonSemanticName } from '../FloatButton';

describe('FloatButton.Semantic', () => {
  it('should update classNames when props change (FloatButton)', () => {
    const initialClassNames: Record<FloatButtonSemanticName, string> = {
      root: 'custom-root',
      icon: 'custom-icon',
      content: 'custom-content',
    };
    const updatedClassNames: Record<FloatButtonSemanticName, string> = {
      root: 'custom-root-2',
      icon: 'custom-icon-2',
      content: 'custom-content-2',
    };
    const styles: Record<FloatButtonSemanticName, Record<string, any>> = {
      root: { color: 'rgb(255, 0, 0)' },
      icon: { color: 'rgb(0, 0, 255)' },
      content: { color: 'rgb(0, 255, 0)' },
    };
    const classNamesTargets: Record<FloatButtonSemanticName, string> = {
      root: 'ant-float-btn',
      icon: 'ant-float-btn-icon',
      content: 'ant-float-btn-content',
    };
    const { container, rerender } = render(
      <FloatButton icon="little" content="bamboo" classNames={initialClassNames} styles={styles} />,
    );
    Object.keys(initialClassNames).forEach((key) => {
      const className = initialClassNames[key as FloatButtonSemanticName];
      const oriClassName = classNamesTargets[key as FloatButtonSemanticName];
      const element = container.querySelector<HTMLElement>(`.${className}`);
      expect(element).toBeTruthy();
      expect(element).toHaveClass(oriClassName);
    });
    rerender(
      <FloatButton icon="little" content="bamboo" classNames={updatedClassNames} styles={styles} />,
    );
    Object.keys(updatedClassNames).forEach((key) => {
      const className = updatedClassNames[key as FloatButtonSemanticName];
      const oriClassName = classNamesTargets[key as FloatButtonSemanticName];
      const element = container.querySelector<HTMLElement>(`.${className}`);
      expect(element).toBeTruthy();
      expect(element).toHaveClass(oriClassName);
    });
  });

  it('should update classNames when props change (Group)', () => {
    const initialClassNames: Required<GetProp<FloatButtonGroupProps, 'classNames'>> = {
      root: 'custom-root',
      list: 'custom-list',
      item: 'custom-item',
      itemIcon: 'custom-item-icon',
      itemContent: 'custom-item-content',
      trigger: 'custom-trigger-root',
      triggerIcon: 'custom-trigger-icon',
      triggerContent: 'custom-trigger-content',
    };
    const updatedClassNames: Required<GetProp<FloatButtonGroupProps, 'classNames'>> = {
      root: 'custom-root-2',
      list: 'custom-list-2',
      item: 'custom-item-2',
      itemIcon: 'custom-item-icon-2',
      itemContent: 'custom-item-content-2',
      trigger: 'custom-trigger-root-2',
      triggerIcon: 'custom-trigger-icon-2',
      triggerContent: 'custom-trigger-content-2',
    };
    const initialStyles: Required<GetProp<FloatButtonGroupProps, 'styles'>> = {
      root: { color: 'rgb(255, 0, 0)' },
      list: { color: 'rgb(0, 0, 255)' },
      item: { color: 'rgb(0, 255, 0)' },
      itemIcon: { color: 'rgb(255, 255, 0)' },
      itemContent: { color: 'rgb(128, 0, 128)' },
      trigger: { color: 'rgb(255, 165, 0)' },
      triggerIcon: { color: 'rgb(255, 192, 203)' },
      triggerContent: { color: 'rgb(0, 255, 255)' },
    };
    const updatedStyles: Required<GetProp<FloatButtonGroupProps, 'styles'>> = {
      root: { color: 'rgb(0, 0, 0)' },
      list: { color: 'rgb(128, 128, 128)' },
      item: { color: 'rgb(0, 255, 0)' },
      itemIcon: { color: 'rgb(255, 215, 0)' },
      itemContent: { color: 'rgb(255, 0, 255)' },
      trigger: { color: 'rgb(165, 42, 42)' },
      triggerIcon: { color: 'rgb(0, 0, 128)' },
      triggerContent: { color: 'rgb(0, 255, 255)' },
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
    const { container, rerender } = render(
      <FloatButton.Group
        open
        icon="little"
        content="bamboo"
        classNames={initialClassNames}
        styles={initialStyles}
        trigger="click"
      >
        <FloatButton icon="little" content="bamboo" />
      </FloatButton.Group>,
    );
    Object.keys(classNamesTargets).forEach((key) => {
      const cells = key.split('.');
      const classNamesObj: any =
        cells.length === 1 ? initialClassNames : (initialClassNames as any)[cells[0]];
      const stylesObj: any = cells.length === 1 ? initialStyles : (initialStyles as any)[cells[0]];
      const name = cells[cells.length - 1];
      const oriClassName = classNamesTargets[key as keyof typeof classNamesTargets];
      const className = classNamesObj[name];
      const style = stylesObj[name];
      const element = container.querySelector<HTMLElement>(oriClassName);
      expect(element).toBeTruthy();
      expect(element).toHaveClass(className);
      expect(element).toHaveStyle(style);
    });
    rerender(
      <FloatButton.Group
        open
        icon="little"
        content="bamboo"
        classNames={updatedClassNames}
        styles={updatedStyles}
        trigger="click"
      >
        <FloatButton icon="little" content="bamboo" />
      </FloatButton.Group>,
    );
    Object.keys(classNamesTargets).forEach((key) => {
      const cells = key.split('.');
      const classNamesObj: any =
        cells.length === 1 ? updatedClassNames : (updatedClassNames as any)[cells[0]];
      const stylesObj: any = cells.length === 1 ? updatedStyles : (updatedStyles as any)[cells[0]];
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
