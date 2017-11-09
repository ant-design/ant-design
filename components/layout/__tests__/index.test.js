import React from 'react';
import { mount } from 'enzyme';
import Layout from '..';

const { Sider, Content } = Layout;

describe('Layout', () => {
  it('detect the sider as children', async () => {
    const wrapper = mount(
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
    );
    expect(wrapper.find('.ant-layout').hasClass('ant-layout-has-sider')).toBe(true);
  });

  it('detect the sider inside the children', async () => {
    const wrapper = mount(
      <Layout>
        <div><Sider>Sider</Sider></div>
        <Content>Content</Content>
      </Layout>
    );
    expect(wrapper.find('.ant-layout').hasClass('ant-layout-has-sider')).toBe(true);
  });
});
