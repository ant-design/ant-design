import React from 'react';
import { Breadcrumb } from 'antd';

export default () => (
  <Breadcrumb>
    {' '}
    <Breadcrumb.Item>Home</Breadcrumb.Item>{' '}
    <Breadcrumb.Item>
      {' '}
      <a href="">Application Center</a>{' '}
    </Breadcrumb.Item>{' '}
    <Breadcrumb.Item>
      {' '}
      <a href="">Application List</a>{' '}
    </Breadcrumb.Item>{' '}
    <Breadcrumb.Item>An Application</Breadcrumb.Item>{' '}
  </Breadcrumb>
);
