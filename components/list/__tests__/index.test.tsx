import React from 'react';

import type { ListProps } from '..';
import List from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('List', () => {
  mountTest(List);
  mountTest(List.Item);

  rtlTest(List);
  rtlTest(List.Item);

  it('locale not passed to internal div', async () => {
    const locale = { emptyText: 'Custom text' };
    const renderItem: ListProps<any>['renderItem'] = (item) => <List.Item>{item}</List.Item>;
    const dataSource: ListProps<any>['dataSource'] = [];

    const { container } = render(
      <List renderItem={renderItem} dataSource={dataSource} locale={locale} />,
    );
    expect(container.querySelector('div.ant-list')?.getAttribute('locale')).toBe(null);
  });

  it('should apply the componentSize of ConfigProvider', () => {
    const { container } = render(
      <>
        <ConfigProvider componentSize="small">
          <List />,
        </ConfigProvider>
        <ConfigProvider componentSize="large">
          <List />,
        </ConfigProvider>
      </>,
    );

    expect(container.querySelector('.ant-list-sm')).toBeTruthy();
    expect(container.querySelector('.ant-list-lg')).toBeTruthy();
  });

  it('ref should be able to get List id passe to internal div', async () => {
    const renderItem: ListProps<any>['renderItem'] = (item) => <List.Item>{item}</List.Item>;
    const dataSource: ListProps<any>['dataSource'] = [];
    const ref = React.createRef<HTMLDivElement>();
    const id = 'list-1';
    render(<List ref={ref} id={id} renderItem={renderItem} dataSource={dataSource} />);

    expect(ref.current?.id).toBe(id);
  });

  it('should render numeric zero header and footer and remove them for empty values', () => {
    const { container, rerender } = render(
      <List
        header={0}
        footer={0}
        dataSource={[0]}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />,
    );

    expect(container.querySelector('.ant-list-header')?.textContent).toBe('0');
    expect(container.querySelector('.ant-list-footer')?.textContent).toBe('0');
    expect(container.querySelector('.ant-list')).toHaveClass('ant-list-something-after-last-item');

    rerender(
      <List
        header={true}
        footer={null}
        dataSource={[0]}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />,
    );

    expect(container.querySelector('.ant-list-header')).toBeNull();
    expect(container.querySelector('.ant-list-footer')).toBeNull();
    expect(container.querySelector('.ant-list')).not.toHaveClass(
      'ant-list-something-after-last-item',
    );
  });
});
