import React from 'react';

import FloatButton from '..';
import type { FloatButtonGroupSemanticType, FloatButtonProps, FloatButtonSemanticType } from '..';
import { render } from '../../../tests/utils';

describe('FloatButton.Semantic', () => {
  it('should update classNames when props change (FloatButton)', () => {
    const initialClassNames: FloatButtonSemanticType['classNames'] = {
      root: 'custom-root',
      icon: 'custom-icon',
      content: 'custom-content',
    };
    const updatedClassNames: FloatButtonSemanticType['classNames'] = {
      root: 'custom-root-2',
      icon: 'custom-icon-2',
      content: 'custom-content-2',
    };
    const styles: FloatButtonSemanticType['styles'] = {
      root: { color: 'rgb(255, 0, 0)' },
      icon: { color: 'rgb(0, 0, 255)' },
      content: { color: 'rgb(0, 255, 0)' },
    };
    const classNamesTargets: FloatButtonSemanticType['classNames'] = {
      root: 'ant-float-btn',
      icon: 'ant-float-btn-icon',
      content: 'ant-float-btn-content',
    };
    const { container, rerender } = render(
      <FloatButton icon="little" content="bamboo" classNames={initialClassNames} styles={styles} />,
    );
    Object.keys(initialClassNames).forEach((key) => {
      const className = initialClassNames[key as keyof FloatButtonSemanticType['classNames']];
      const oriClassName = classNamesTargets[key as keyof FloatButtonSemanticType['classNames']];
      const element = container.querySelector<HTMLElement>(`.${className}`);
      expect(element).toBeTruthy();
      expect(element).toHaveClass(oriClassName);
    });
    rerender(
      <FloatButton icon="little" content="bamboo" classNames={updatedClassNames} styles={styles} />,
    );
    Object.keys(updatedClassNames).forEach((key) => {
      const className = updatedClassNames[key as keyof FloatButtonSemanticType['classNames']];
      const oriClassName = classNamesTargets[key as keyof FloatButtonSemanticType['classNames']];
      const element = container.querySelector<HTMLElement>(`.${className}`);
      expect(element).toBeTruthy();
      expect(element).toHaveClass(oriClassName);
    });
  });

  it('should update classNames when props change (Group)', () => {
    const initialClassNames: FloatButtonGroupSemanticType['classNames'] = {
      root: 'custom-root',
      list: 'custom-list',
      item: 'custom-item',
      itemIcon: 'custom-item-icon',
      itemContent: 'custom-item-content',
      trigger: 'custom-trigger-root',
      triggerIcon: 'custom-trigger-icon',
      triggerContent: 'custom-trigger-content',
    };
    const updatedClassNames: FloatButtonGroupSemanticType['classNames'] = {
      root: 'custom-root-2',
      list: 'custom-list-2',
      item: 'custom-item-2',
      itemIcon: 'custom-item-icon-2',
      itemContent: 'custom-item-content-2',
      trigger: 'custom-trigger-root-2',
      triggerIcon: 'custom-trigger-icon-2',
      triggerContent: 'custom-trigger-content-2',
    };
    const initialStyles: FloatButtonGroupSemanticType['styles'] = {
      root: { color: 'rgb(255, 0, 0)' },
      list: { color: 'rgb(0, 0, 255)' },
      item: { color: 'rgb(0, 255, 0)' },
      itemIcon: { color: 'rgb(255, 255, 0)' },
      itemContent: { color: 'rgb(128, 0, 128)' },
      trigger: { color: 'rgb(255, 165, 0)' },
      triggerIcon: { color: 'rgb(255, 192, 203)' },
      triggerContent: { color: 'rgb(0, 255, 255)' },
    };
    const updatedStyles: FloatButtonGroupSemanticType['styles'] = {
      root: { color: 'rgb(0, 0, 0)' },
      list: { color: 'rgb(128, 128, 128)' },
      item: { color: 'rgb(0, 255, 0)' },
      itemIcon: { color: 'rgb(255, 215, 0)' },
      itemContent: { color: 'rgb(255, 0, 255)' },
      trigger: { color: 'rgb(165, 42, 42)' },
      triggerIcon: { color: 'rgb(0, 0, 128)' },
      triggerContent: { color: 'rgb(0, 255, 255)' },
    };
    const classNamesTargets: FloatButtonGroupSemanticType['classNames'] = {
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
      const element = container.querySelector<HTMLElement>(oriClassName as string);
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
      const element = container.querySelector<HTMLElement>(oriClassName as string);
      expect(element).toBeTruthy();
      expect(element).toHaveClass(className);
      expect(element).toHaveStyle(style);
    });
  });

  it('should apply dynamic classNames and styles from props function', () => {
    const classNames: FloatButtonProps['classNames'] = (info) => {
      if (info.props.type === 'primary') {
        return { root: 'float-btn-primary' };
      }

      return { root: 'float-btn-default' };
    };
    const styles: FloatButtonProps['styles'] = (info) => {
      if (info.props.shape === 'square') {
        return { root: { background: 'red' } };
      }
      return { root: { background: 'blue' } };
    };

    const { rerender, container } = render(
      <FloatButton type="primary" classNames={classNames} styles={styles} />,
    );
    expect(container.querySelector('.float-btn-primary')).toBeTruthy();
    expect(container.querySelector('[style*="background: blue"]')).toBeTruthy();

    rerender(<FloatButton type="default" shape="square" classNames={classNames} styles={styles} />);
    expect(container.querySelector('.float-btn-default')).toBeTruthy();
    expect(container.querySelector('[style*="background: red"]')).toBeTruthy();
  });

  it('should apply object classNames and styles', () => {
    const classNames = { root: 'float-btn-custom', icon: 'float-btn-icon-custom' };
    const styles = { root: { border: '1px solid red' }, icon: { opacity: 0.5 } };

    const { container } = render(<FloatButton classNames={classNames} styles={styles} />);
    expect(container.querySelector('.float-btn-custom')).toBeTruthy();
    expect(container.querySelector('.float-btn-icon-custom')).toBeTruthy();
  });
});
