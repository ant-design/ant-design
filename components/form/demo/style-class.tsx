import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import type { FormProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    padding: token.padding,
    maxWidth: 800,
    marginTop: 32,
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadius,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
}));

const App: React.FC = () => {
  const { styles: classNames } = useStyles();

  const stylesObject: FormProps['styles'] = {
    label: {
      textAlign: 'right',
      color: '#333',
      fontWeight: 500,
    },
    content: {
      paddingLeft: 12,
    },
  };

  const stylesFunction: FormProps['styles'] = (info) => {
    if (info.props.variant === 'filled') {
      return {
        root: {
          border: '1px solid #1677FF',
        },
        label: {
          textAlign: 'right',
          color: '#1677FF',
        },
        content: {
          paddingLeft: 12,
        },
      };
    }
    return {};
  };

  const sharedProps: FormProps = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    autoComplete: 'off',
    classNames,
  };

  const FormContent = (
    <>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please enter username!' }]}
      >
        <Input placeholder="Please enter username" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please enter email!' }]}
      >
        <Input placeholder="Please enter email" />
      </Form.Item>

      <Form.Item label={null}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="reset">reset</Button>
        </Space>
      </Form.Item>
    </>
  );

  return (
    <>
      <Form {...sharedProps} styles={stylesObject}>
        {FormContent}
      </Form>

      <Form {...sharedProps} variant="filled" styles={stylesFunction}>
        {FormContent}
      </Form>
    </>
  );
};

export default App;
