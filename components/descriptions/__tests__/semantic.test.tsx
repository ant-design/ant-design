import React from 'react';

import Descriptions from '..';
import type { DescriptionsProps } from '..';
import { render } from '../../../tests/utils';

describe('Descriptions.Semantic', () => {
  it('should apply custom styles to Descriptions', () => {
    const customClassNames = {
      root: 'custom-root',
      header: 'custom-header',
      title: 'custom-title',
      extra: 'custom-extra',
      label: 'custom-label',
      content: 'custom-content',
    };

    const customStyles = {
      root: { backgroundColor: 'red' },
      header: { backgroundColor: 'black' },
      title: { backgroundColor: 'yellow' },
      extra: { backgroundColor: 'purple' },
      label: { backgroundColor: 'blue' },
      content: { backgroundColor: 'green' },
    };

    const { container } = render(
      <Descriptions
        classNames={customClassNames}
        styles={customStyles}
        extra={'extra'}
        title="User Info"
        items={[
          {
            key: '1',
            label: 'UserName',
            children: '1',
          },
          {
            key: '2',
            label: 'UserName',
            children: '2',
            styles: {
              content: { color: 'yellow' },
              label: { color: 'orange' },
            },
            classNames: {
              content: 'item-content',
              label: 'item-label',
            },
          },
        ]}
      />,
    );

    const rootElement = container.querySelector<HTMLDivElement>('.ant-descriptions')!;
    const headerElement = container.querySelector<HTMLDivElement>('.ant-descriptions-header')!;
    const titleElement = container.querySelector<HTMLDivElement>('.ant-descriptions-title')!;
    const extraElement = container.querySelector<HTMLDivElement>('.ant-descriptions-extra')!;
    const labelElement = container.querySelector<HTMLDivElement>('.ant-descriptions-item-label')!;
    const contentElement = container.querySelector<HTMLDivElement>(
      '.ant-descriptions-item-content',
    )!;
    const labelElements = container.querySelectorAll<HTMLDivElement>(
      '.ant-descriptions-item-label',
    );
    const contentElements = container.querySelectorAll<HTMLDivElement>(
      '.ant-descriptions-item-content',
    );

    // check classNames
    expect(rootElement.classList).toContain('custom-root');
    expect(headerElement.classList).toContain('custom-header');
    expect(titleElement.classList).toContain('custom-title');
    expect(extraElement.classList).toContain('custom-extra');
    expect(labelElement.classList).toContain('custom-label');
    expect(contentElement.classList).toContain('custom-content');

    // check styles
    expect(rootElement.style.backgroundColor).toBe('red');
    expect(headerElement.style.backgroundColor).toBe('black');
    expect(titleElement.style.backgroundColor).toBe('yellow');
    expect(extraElement.style.backgroundColor).toBe('purple');
    expect(labelElement.style.backgroundColor).toBe('blue');
    expect(contentElement.style.backgroundColor).toBe('green');

    expect(labelElements[1].style.color).toBe('orange');
    expect(contentElements[1].style.color).toBe('yellow');
    expect(labelElements[0].style.color).not.toBe('orange');
    expect(contentElements[0].style.color).not.toBe('yellow');

    expect(labelElements[1].classList).toContain('item-label');
    expect(contentElements[1].classList).toContain('item-content');
    expect(labelElements[0].classList).not.toContain('item-label');
    expect(contentElements[0].classList).not.toContain('item-content');
  });

  it('should apply dynamic classNames and styles from props function', () => {
    const rootStyleItems: DescriptionsProps['items'] = [
      {
        key: '1',
        label: 'Product',
        children: 'Cloud Database',
      },
      {
        key: '2',
        label: 'Billing Mode',
        children: 'Prepaid',
      },
      {
        key: '3',
        label: 'Automatic Renewal',
        children: 'YES',
      },
    ];

    const classNames: DescriptionsProps['classNames'] = (info) => {
      if (info.props.bordered) {
        return { root: 'test-ant-root', label: 'test-ant-label', title: 'test-ant-title' };
      } else {
        return { extra: 'test-ant-extra', content: 'test-ant-content' };
      }
    };
    const styles: DescriptionsProps['styles'] = (info) => {
      if (info.props.bordered) {
        return { content: { background: 'red' } };
      } else {
        return { content: { background: 'blue' } };
      }
    };

    const { rerender, container } = render(
      <Descriptions
        title="User Info"
        styles={styles}
        classNames={classNames}
        bordered
        items={rootStyleItems}
      />,
    );

    expect(container.querySelector('.ant-descriptions')).toHaveClass('test-ant-root');
    expect(container.querySelector('.ant-descriptions-title')).toHaveClass('test-ant-title');
    expect(container.querySelector('.ant-descriptions-item-label')).toHaveClass('test-ant-label');
    expect(container.querySelector('.ant-descriptions-item-content')).toHaveStyle({
      background: 'red',
    });

    rerender(
      <Descriptions
        title="User Info"
        styles={styles}
        classNames={classNames}
        items={rootStyleItems}
        extra={<span>extra</span>}
      />,
    );

    expect(container.querySelector('.ant-descriptions-extra')).toHaveClass('test-ant-extra');
    expect(container.querySelector('.ant-descriptions-item-content')).toHaveClass(
      'test-ant-content',
    );
    expect(container.querySelector('.ant-descriptions-item-content')).toHaveStyle({
      background: 'blue',
    });
  });
});
