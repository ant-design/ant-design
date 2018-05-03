import React from 'react';
import { mount } from 'enzyme';
import List from '..';

const ListItem = List.Item;

describe('List', () => {
  it('locale not passed to internal div', async () => {
    const locale = { emptyText: 'Custom text' };
    const renderItem = item => <ListItem>{item}</ListItem>;
    const dataSource = [];

    const wrapper = mount(
      <List renderItem={renderItem} dataSource={dataSource} locale={locale} />
    );
    expect(wrapper.find('div').first().props().locale).toBe(undefined);
  });
});
