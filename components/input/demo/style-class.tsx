import React from 'react';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Space } from 'antd';
import type { ButtonProps, InputProps, GetProps } from 'antd';

type OTPProps = GetProps<typeof Input.OTP>;
type TextAreaProps = GetProps<typeof Input.TextArea>;
type SearchProps = GetProps<typeof Input.Search>;

const { Search, TextArea, OTP } = Input;

const classNamesObject: InputProps['classNames'] = {
  root: 'demo-input-root',
  input: 'demo-input-element',
};

const classNamesFn: InputProps['classNames'] = (info) => {
  if (info.props.disabled) {
    return { root: 'demo-input-root--disabled' };
  }
  return { root: 'demo-input-root--enabled' };
};

const stylesObject: InputProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed' },
  input: { fontStyle: 'italic' },
};

const stylesFn: InputProps['styles'] = (info) => {
  if (info.props.size === 'large') {
    return { root: { backgroundColor: '#fafafa', borderColor: '#d9d9d9' } };
  }
  return { root: { backgroundColor: '#fffbe6', borderColor: '#ffe58f' } };
};

const classNamesTextArea: TextAreaProps['classNames'] = {
  root: 'demo-input-root',
  textarea: 'demo-input-textarea',
  count: 'demo-input-count',
};
const stylesFnTextArea: TextAreaProps['styles'] = (info) => {
  const { props } = info;
  const { showCount = false } = props;
  return {
    root: { color: 'rgb(0, 255, 0)' },
    textarea: { color: 'rgb(255, 0, 0)' },
    count: { color: showCount ? 'rgb(170, 0, 255)' : 'rgb(0, 0, 255)' },
  };
};

const classNamesObjectOTP: OTPProps['classNames'] = {
  root: 'demo-input-root',
  input: 'demo-input-input',
  separator: 'demo-input-separator',
};
const stylesFnOTP: OTPProps['styles'] = (info) => {
  const { props } = info;
  const { separator = '-' } = props;
  return {
    root: { color: 'rgb(0, 255, 0)' },
    input: { color: 'rgb(255, 0, 0)' },
    separator: { color: separator === '*' ? 'rgb(255, 0, 0)' : 'rgb(0, 255, 0)' },
  };
};

const classNamesObjectSearch: SearchProps['classNames'] = {
  root: 'demo-input-root',
  input: 'demo-input-input',
  prefix: 'demo-input-prefix',
  suffix: 'demo-input-suffix',
  count: 'demo-input-count',
};
const stylesFnSearch: SearchProps['styles'] = (info) => {
  const { props } = info;
  const { size = 'small' } = props;
  return {
    root: { color: 'rgb(0, 255, 0)' },
    input: { color: 'rgb(255, 0, 0)' },
    prefix: { color: size === 'large' ? 'rgb(255, 179, 0)' : 'rgb(0, 0, 255)' },
    suffix: { color: 'rgb(255, 0, 0)' },
    count: { color: 'rgb(0, 0, 255)' },
    button: {
      root: { color: 'rgb(0, 255, 0)' },
      icon: { color: size === 'large' ? 'rgb(255, 0, 0)' : 'rgb(0, 0, 255)' },
      content: { color: 'rgb(0, 0, 255)' },
    },
  };
};

const classNamesObjectUserButton: ButtonProps['classNames'] = {
  root: 'user-input-button-root',
  icon: 'user-input-button-icon',
  content: 'user-input-button-content',
};
const stylesFnUserButton: ButtonProps['styles'] = (info) => {
  const { props } = info;
  const { size = false } = props;
  return {
    root: { color: 'rgb(0, 255, 0)' },
    icon: { color: size === 'large' ? 'rgb(179, 0, 255)' : 'rgb(0, 0, 255)' },
    content: { color: 'rgb(0, 0, 255)' },
  };
};

const App: React.FC = () => (
  <Space size={[8, 16]} wrap>
    <Flex gap="small">
      <Input classNames={classNamesObject} placeholder="classNames Object" />
      <Input disabled classNames={classNamesFn} placeholder="classNames Function" />
    </Flex>
    <Flex gap="small">
      <Input styles={stylesObject} placeholder="styles Object" />
      <Input size="large" styles={stylesFn} placeholder="styles Function" />
    </Flex>
    <Flex gap="small">
      <TextArea
        classNames={classNamesTextArea}
        styles={stylesFnTextArea}
        value="classnames Object"
      />
      <TextArea styles={stylesFnTextArea} showCount value="style Object" />
    </Flex>
    <Flex gap="small">
      <OTP length={6} separator="*" classNames={classNamesObjectOTP} styles={stylesFnOTP} />
    </Flex>
    <Flex gap="small">
      <Search placeholder="inner button" styles={stylesFnSearch} defaultValue="" size="large" />
    </Flex>
    <Flex gap="small">
      <Search
        placeholder="custom button"
        showCount
        prefix={<UserOutlined />}
        suffix={<EditOutlined />}
        classNames={classNamesObjectSearch}
        styles={stylesFnSearch}
        defaultValue=""
        size="large"
        enterButton={
          <Button
            type="dashed"
            classNames={classNamesObjectUserButton}
            styles={stylesFnUserButton}
            icon={<UserOutlined />}
            ghost
          >
            button ghost
          </Button>
        }
      />
    </Flex>
  </Space>
);

export default App;
