import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import type { FormProps, FormSemanticType } from 'antd';
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

const stylesObject: FormProps['styles'] = {
  label: {
    textAlign: 'end',
    color: '#333',
    fontWeight: 500,
  },
  content: {
    paddingInlineStart: 12,
  },
};

const stylesFunction: FormProps['styles'] = (info): FormSemanticType['styles'] => {
  if (info.props.variant === 'filled') {
    return {
      root: {
        border: '1px solid #1677FF',
      },
      label: {
        textAlign: 'end',
        color: '#1677FF',
      },
      content: {
        paddingInlineStart: 12,
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();

  const sharedProps: FormProps = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    autoComplete: 'off',
    classNames,
  };

  const sharedFormContent = (
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
        {sharedFormContent}
      </Form>
      <Form {...sharedProps} styles={stylesFunction} variant="filled">
        {sharedFormContent}
      </Form>
    </>
  );
};

export default App;
