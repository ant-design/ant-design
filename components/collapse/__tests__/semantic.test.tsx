import React from 'react';

import Collapse from '..';
import type { CollapseProps } from '..';
import { render } from '../../../tests/utils';

describe('Collapse.Semantic', () => {
  it('should support styles and classNames', () => {
    const customClassNames: CollapseProps['classNames'] = {
      root: 'custom-root',
      header: 'custom-header',
      title: 'custom-title',
      body: 'custom-body',
      icon: 'custom-icon',
    };
    const customStyles: CollapseProps['styles'] = {
      root: { color: 'rgb(255, 0, 0)' },
      header: { color: 'rgb(0, 0, 255)' },
      title: { color: 'rgb(0, 128, 0)' },
      body: { color: 'rgb(255, 255, 0)' },
      icon: { color: 'rgb(128, 0, 128)' },
    };
    const { container } = render(
      <Collapse
        activeKey={['1']}
        styles={customStyles}
        classNames={customClassNames}
        items={[{ key: '1', label: 'title' }]}
      />,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-collapse');
    const headerElement = container.querySelector<HTMLElement>('.ant-collapse-header');
    const titleElement = container.querySelector<HTMLElement>('.ant-collapse-title');
    const bodyElement = container.querySelector<HTMLElement>('.ant-collapse-body');
    const iconElement = container.querySelector<HTMLElement>('.ant-collapse-expand-icon');

    // check classNames
    expect(rootElement).toHaveClass(customClassNames.root as string);
    expect(headerElement).toHaveClass(customClassNames.header as string);
    expect(titleElement).toHaveClass(customClassNames.title as string);
    expect(bodyElement).toHaveClass(customClassNames.body as string);
    expect(iconElement).toHaveClass(customClassNames.icon as string);
    // check styles
    expect(rootElement).toHaveStyle({ color: customStyles.root?.color });
    expect(headerElement).toHaveStyle({ color: customStyles.header?.color });
    expect(titleElement).toHaveStyle({ color: customStyles.title?.color });
    expect(bodyElement).toHaveStyle({ color: customStyles.body?.color });
    expect(iconElement).toHaveStyle({ color: customStyles.icon?.color });
  });

  it('should support function-based classNames and styles', () => {
    const fnClassNames: CollapseProps['classNames'] = ({ props }) => ({
      root: `size-${props.size}`,
      header: props.ghost ? 'ghost-header' : 'normal-header',
      title: 'dynamic-title',
      body: 'dynamic-body',
      icon: props.expandIconPlacement === 'end' ? 'end-icon' : 'start-icon',
    });

    const fnStyles: CollapseProps['styles'] = ({ props }) => ({
      root: { borderWidth: props.ghost ? '0px' : '1px' },
      header: { fontSize: props.size === 'large' ? '18px' : '14px' },
      title: { fontWeight: props.size === 'large' ? 'bold' : 'normal' },
      body: { padding: props.size === 'small' ? '8px' : '16px' },
      icon: { transform: props.expandIconPlacement === 'end' ? 'rotate(90deg)' : 'none' },
    });

    const { container } = render(
      <Collapse
        activeKey={['1']}
        size="large"
        ghost
        expandIconPlacement="end"
        styles={fnStyles}
        classNames={fnClassNames}
        items={[{ key: '1', label: 'title' }]}
      />,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-collapse');
    const headerElement = container.querySelector<HTMLElement>('.ant-collapse-header');
    const titleElement = container.querySelector<HTMLElement>('.ant-collapse-title');
    const bodyElement = container.querySelector<HTMLElement>('.ant-collapse-body');
    const iconElement = container.querySelector<HTMLElement>('.ant-collapse-expand-icon');

    // check function-based classNames
    expect(rootElement).toHaveClass('size-large');
    expect(headerElement).toHaveClass('ghost-header');
    expect(titleElement).toHaveClass('dynamic-title');
    expect(bodyElement).toHaveClass('dynamic-body');
    expect(iconElement).toHaveClass('end-icon');

    // check function-based styles
    expect(rootElement).toHaveStyle({ borderWidth: '0px' });
    expect(headerElement).toHaveStyle({ fontSize: '18px' });
    expect(titleElement).toHaveStyle({ fontWeight: 'bold' });
    expect(bodyElement).toHaveStyle({ padding: '16px' });
    expect(iconElement).toHaveStyle({ transform: 'rotate(90deg)' });
  });
});
