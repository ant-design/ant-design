import React from 'react';

import Descriptions from '..';
import type { DescriptionsProps } from '..';
import { render } from '../../../tests/utils';

describe('Descriptions.Semantic', () => {
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

  it('should apply semantic classNames and styles from Descriptions.Item', () => {
    const customStyles: DescriptionsProps['styles'] = {
      label: { color: 'rgb(255, 0, 0)' },
      content: { color: 'rgb(0, 0, 255)' },
    };
    const customClassNames: DescriptionsProps['classNames'] = {
      label: 'custom-label',
      content: 'custom-content',
    };
    const rootClassNames: DescriptionsProps['classNames'] = {
      label: 'root-label',
      content: 'root-content',
    };
    const rootStyles: DescriptionsProps['styles'] = {
      label: { fontSize: '20px' },
      content: { fontSize: '18px' },
    };
    const Items: DescriptionsProps['items'] = [
      {
        key: '1',
        label: 'Product',
        children: 'Cloud Database',
        classNames: customClassNames,
        styles: customStyles,
      },
      {
        key: '2',
        label: 'Billing Mode',
        children: 'Prepaid',
      },
    ];

    const { container } = render(
      <Descriptions
        classNames={rootClassNames}
        styles={rootStyles}
        title="User Info"
        items={Items}
      />,
    );
    const items = container.querySelectorAll('.ant-descriptions-item');
    const firstChild = items[0];
    const secondChild = items[1];
    expect(firstChild.querySelector('.ant-descriptions-item-label')).toHaveStyle({
      color: 'rgb(255, 0, 0)',
      fontSize: '20px',
    });
    expect(firstChild.querySelector('.ant-descriptions-item-content')).toHaveStyle({
      color: 'rgb(0, 0, 255)',
      fontSize: '18px',
    });
    expect(secondChild.querySelector('.ant-descriptions-item-label')).not.toHaveStyle({
      color: 'rgb(255, 0, 0)',
    });
    expect(secondChild.querySelector('.ant-descriptions-item-content')).not.toHaveStyle({
      color: 'rgb(0, 0, 255)',
    });

    expect(firstChild.querySelector('.ant-descriptions-item-label')).toHaveClass('custom-label');
    expect(firstChild.querySelector('.ant-descriptions-item-content')).toHaveClass(
      'custom-content',
    );
    expect(secondChild.querySelector('.ant-descriptions-item-label')).toHaveClass('root-label');
    expect(secondChild.querySelector('.ant-descriptions-item-content')).toHaveClass('root-content');

    expect(firstChild.querySelector('.ant-descriptions-item-label')).toHaveClass('root-label');
    expect(firstChild.querySelector('.ant-descriptions-item-content')).toHaveClass('root-content');
    expect(secondChild.querySelector('.ant-descriptions-item-label')).not.toHaveClass(
      'custom-label',
    );
    expect(secondChild.querySelector('.ant-descriptions-item-content')).not.toHaveClass(
      'custom-content',
    );
  });
});
