---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

基本结构。

## en-US

Basic structure.

````jsx
import { Layout } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

ReactDOM.render(
  <Layout style={{
    color: '#fff',
    backgroundColor: '#ededed',
    backgroundSize: '50px 50px',
    backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, .7) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .7) 50%, rgba(255, 255, 255, .7) 75%, transparent 75%, transparent)',
  }}
  >
    <Header style={{
      color: '#fff',
      background: 'rgba(16, 142, 233, 0.5)',
    }}
    >Header</Header>
    <Layout style={{
      color: '#fff',
      backgroundColor: '#ededed',
      backgroundSize: '50px 50px',
      backgroundImage: 'linear-gradient(-45deg, rgba(255, 255, 255, .7) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .7) 50%, rgba(255, 255, 255, .7) 75%, transparent 75%, transparent)',
    }}
    >
      <Sider style={{
        color: '#fff',
        background: 'rgba(16, 142, 233, 0.9)',
      }}
      >Sider</Sider>
      <Content style={{
        color: '#fff',
        background: 'rgba(16, 142, 233, 0.7)',
      }}
      >Content</Content>
    </Layout>
    <Footer style={{
      color: '#fff',
      background: 'rgba(16, 142, 233, 0.5)',
    }}
    >Footer</Footer>
  </Layout>
, mountNode);
````
