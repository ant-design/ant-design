import React from 'react';
import { render } from 'enzyme';
import List from '..';
import Icon from '../../icon';

describe('List', () => {
  it('renders empty loading', () => {
    const loading = {
      spinning: true,
    };
    const wrapper = render(
      <List loading={loading} dataSource={[]} renderItem={() => <List.Item />} />
    );
    expect(wrapper.find('.ant-list-empty-text')).toHaveLength(0);
  });

  it('renders object loading', () => {
    const loading = {
      spinning: true,
    };
    const wrapper = render(
      <List
        loading={loading}
        dataSource={[1]}
        renderItem={() => <List.Item />}
      />
    );
    expect(wrapper.find('.ant-spin-spinning')).toHaveLength(1);
  });

  it('renders object loading with indicator', () => {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    const loading = {
      spinning: true,
      indicator: antIcon,
    };
    const wrapper = render(
      <List
        loading={loading}
        dataSource={[1]}
        renderItem={() => <List.Item />}
      />
    );
    expect(wrapper.find('.anticon-loading')).toHaveLength(1);
  });
});
