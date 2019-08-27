import React from 'react';
import { mount } from 'enzyme';
import List from '..';
import mountTest from '../../../tests/shared/mountTest';

describe('List', () => {
  mountTest(List);
  mountTest(List.Item);

  it('locale not passed to internal div', async () => {
    const locale = { emptyText: 'Custom text' };
    const renderItem = item => <List.Item>{item}</List.Item>;
    const dataSource = [];

    const wrapper = mount(<List renderItem={renderItem} dataSource={dataSource} locale={locale} />);
    expect(
      wrapper
        .find('div')
        .first()
        .props().locale,
    ).toBe(undefined);
  });
});
