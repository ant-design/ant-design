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

    const customStyles: Record<PropertyKey, React.CSSProperties> = {
      root: { padding: 10 },
      header: { padding: 20 },
      title: { padding: 30 },
      extra: { padding: 40 },
      label: { padding: 50 },
      content: { padding: 60 },
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
              content: { margin: 100 },
              label: { margin: 200 },
            },
            classNames: {
              content: 'item-content',
              label: 'item-label',
            },
          },
        ]}
      />,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-descriptions');
    const headerElement = container.querySelector<HTMLElement>('.ant-descriptions-header');
    const titleElement = container.querySelector<HTMLElement>('.ant-descriptions-title');
    const extraElement = container.querySelector<HTMLElement>('.ant-descriptions-extra');
    const labelElement = container.querySelector<HTMLElement>('.ant-descriptions-item-label');
    const contentElement = container.querySelector<HTMLElement>('.ant-descriptions-item-content');
    const labelElements = container.querySelectorAll<HTMLElement>('.ant-descriptions-item-label');
    const contentElements = container.querySelectorAll<HTMLElement>(
      '.ant-descriptions-item-content',
    );

    // check classNames
    expect(rootElement).toHaveClass('custom-root');
    expect(headerElement).toHaveClass('custom-header');
    expect(titleElement).toHaveClass('custom-title');
    expect(extraElement).toHaveClass('custom-extra');
    expect(labelElement).toHaveClass('custom-label');
    expect(contentElement).toHaveClass('custom-content');

    // check styles
    expect(rootElement).toHaveStyle({ padding: '10px' });
    expect(headerElement).toHaveStyle({ padding: '20px' });
    expect(titleElement).toHaveStyle({ padding: '30px' });
    expect(extraElement).toHaveStyle({ padding: '40px' });
    expect(labelElement).toHaveStyle({ padding: '50px' });
    expect(contentElement).toHaveStyle({ padding: '60px' });

    expect(labelElements[1]).toHaveStyle({ margin: '200px' });
    expect(contentElements[1]).toHaveStyle({ margin: '100px' });
    expect(labelElements[0]).not.toHaveStyle({ margin: '200px' });
    expect(contentElements[0]).not.toHaveStyle({ margin: '100px' });
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
