import React from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
export default () => (
  <>
    <Layout>
      <Header>Header</Header> <Content>Content</Content> <Footer>Footer</Footer>
    </Layout>
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider> <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
    <Layout>
      {' '}
      <Header>Header</Header>{' '}
      <Layout>
        {' '}
        <Content>Content</Content> <Sider>Sider</Sider>{' '}
      </Layout>{' '}
      <Footer>Footer</Footer>{' '}
    </Layout>{' '}
    <Layout>
      {' '}
      <Sider>Sider</Sider>{' '}
      <Layout>
        {' '}
        <Header>Header</Header> <Content>Content</Content> <Footer>Footer</Footer>{' '}
      </Layout>{' '}
    </Layout>{' '}
  </>
);
