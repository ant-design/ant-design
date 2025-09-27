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
});
