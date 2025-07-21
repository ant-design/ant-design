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
      root: { color: 'red' },
      icon: { color: 'blue' },
      content: { color: 'green' },
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
    const initialClassNames = {
      root: 'custom-root',
      list: 'custom-list',
      item: 'custom-item',
      itemIcon: 'custom-item-icon',
      itemContent: 'custom-item-content',
      trigger: 'custom-trigger-root',
      triggerIcon: 'custom-trigger-icon',
      triggerContent: 'custom-trigger-content',
    };
    const updatedClassNames = {
      root: 'custom-root-2',
      list: 'custom-list-2',
      item: 'custom-item-2',
      itemIcon: 'custom-item-icon-2',
      itemContent: 'custom-item-content-2',
      trigger: 'custom-trigger-root-2',
      triggerIcon: 'custom-trigger-icon-2',
      triggerContent: 'custom-trigger-content-2',
    };
    const initialStyles = {
      root: { color: 'red' },
      list: { color: 'blue' },
      item: { color: 'green' },
      itemIcon: { color: 'yellow' },
      itemContent: { color: 'purple' },
      trigger: { color: 'orange' },
      triggerIcon: { color: 'pink' },
      triggerContent: { color: 'cyan' },
    };
    const updatedStyles = {
      root: { color: 'black' },
      list: { color: 'gray' },
      item: { color: 'lime' },
      itemIcon: { color: 'gold' },
      itemContent: { color: 'magenta' },
      trigger: { color: 'brown' },
      triggerIcon: { color: 'navy' },
      triggerContent: { color: 'teal' },
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
