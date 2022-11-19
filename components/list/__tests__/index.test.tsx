import React from 'react';
import type { ListProps } from '..';
import List from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

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
});
