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
});
