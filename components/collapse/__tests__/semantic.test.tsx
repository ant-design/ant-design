import React from 'react';

import Collapse from '..';
import type { CollapseProps } from '..';
import { render } from '../../../tests/utils';

describe('Collapse.Semantic', () => {
  it('should support styles and classNames', () => {
    const customClassNames = {
      root: 'custom-root',
      header: 'custom-header',
      title: 'custom-title',
      body: 'custom-body',
      icon: 'custom-icon',
    };
    const customStyles = {
      root: { color: 'red' },
      header: { color: 'blue' },
      title: { color: 'green' },
      body: { color: 'yellow' },
      icon: { color: 'purple' },
    };
    const { container } = render(
      <Collapse
        activeKey={['1']}
        styles={customStyles}
        classNames={customClassNames}
        items={[
          {
            key: '1',
            label: 'title',
          },
        ]}
      />,
    );

    const rootElement = container.querySelector('.ant-collapse') as HTMLElement;
    const headerElement = container.querySelector('.ant-collapse-header') as HTMLElement;
    const titleElement = container.querySelector('.ant-collapse-title') as HTMLElement;
    const bodyElement = container.querySelector('.ant-collapse-body') as HTMLElement;
    const iconElement = container.querySelector('.ant-collapse-expand-icon') as HTMLElement;

    // check classNames
    expect(rootElement).toHaveClass('custom-root');
    expect(headerElement).toHaveClass('custom-header');
    expect(titleElement).toHaveClass('custom-title');
    expect(bodyElement).toHaveClass('custom-body');
    expect(iconElement).toHaveClass('custom-icon');

    // check styles
    expect(rootElement).toHaveStyle({ color: 'red' });
    expect(headerElement).toHaveStyle({ color: 'blue' });
    expect(titleElement).toHaveStyle({ color: 'green' });
    expect(bodyElement).toHaveStyle({ color: 'yellow' });
    expect(iconElement).toHaveStyle({ color: 'purple' });
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

    const rootElement = container.querySelector('.ant-collapse') as HTMLElement;
    const headerElement = container.querySelector('.ant-collapse-header') as HTMLElement;
    const titleElement = container.querySelector('.ant-collapse-title') as HTMLElement;
    const bodyElement = container.querySelector('.ant-collapse-body') as HTMLElement;
    const iconElement = container.querySelector('.ant-collapse-expand-icon') as HTMLElement;

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
