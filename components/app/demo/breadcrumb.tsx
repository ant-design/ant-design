import React from 'react';
import { App, Breadcrumb, Typography } from 'antd';

// Sub pages
const EmailPage = () => {
  return (
    <div>
      <Breadcrumb items={[{ title: 'Email' }]} />
      <Typography.Title level={2}>Email Settings</Typography.Title>
    </div>
  );
};

const PasswordPage = () => {
  return (
    <div>
      <Breadcrumb items={[{ title: 'Password' }]} />
      <Typography.Title level={2}>Password Settings</Typography.Title>
    </div>
  );
};

// Entry component
export default () => (
  <App breadcrumb={{ items: [{ title: 'Whatever' }] }}>
    <App
      breadcrumb={{
        items: [{ title: 'Home' }],
        root: true, // don't inherit the parent's breadcrumb
      }}
    >
      <App breadcrumb={{ items: [{ title: 'Settings' }] }}>
        <EmailPage />
        <PasswordPage />
      </App>
    </App>
  </App>
);
