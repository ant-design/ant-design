import React from 'react';
import { Flex, Input } from 'antd';
import type { GetProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  root: {
    width: 300,
    marginBottom: 10,
  },
}));

type InputProps = GetProps<typeof Input>;
type PasswordProps = GetProps<typeof Input.Password>;
type TextAreaProps = GetProps<typeof Input.TextArea>;
type OTPProps = GetProps<typeof Input.OTP>;
type SearchProps = GetProps<typeof Input.Search>;

const { Search, TextArea, OTP, Password } = Input;

const stylesFn: InputProps['styles'] = (info) => {
  if (info.props.size === 'middle') {
    return {
      root: { borderColor: '#696FC7' },
    };
  }
  return {};
};

const stylesFnTextArea: TextAreaProps['styles'] = (info) => {
  if (info.props.showCount) {
    return {
      root: { borderColor: '#BDE3C3' },
      count: { color: '#BDE3C3' },
    };
  }
  return {};
};

const stylesFnPassword: PasswordProps['styles'] = (info) => {
  if (info.props.size === 'middle') {
    return {
      root: { borderColor: '#F5D3C4' },
    };
  }
  return {};
};

const stylesFnOTP: OTPProps['styles'] = (info) => {
  if (info.props.size === 'middle') {
    return {
      input: { borderColor: '#6E8CFB' },
      prefix: { color: '#6E8CFB' },
    };
  }
  return {};
};

const stylesFnSearch: SearchProps['styles'] = (info) => {
  if (info.props.size === 'large') {
    return {
      root: { color: '#4DA8DA' },
      input: { color: '#4DA8DA' },
      prefix: { color: '#4DA8DA' },
      suffix: { color: '#4DA8DA' },
      count: { color: '#4DA8DA' },
      button: {
        icon: { color: '#4DA8DA' },
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Flex vertical gap="middle">
      <Input classNames={classNames} placeholder="Object" />
      <Input size="middle" classNames={classNames} styles={stylesFn} placeholder="Function" />
      <TextArea classNames={classNames} showCount styles={stylesFnTextArea} value="TextArea" />
      <Password size="middle" classNames={classNames} styles={stylesFnPassword} value="Password" />
      <OTP size="middle" length={6} separator="*" classNames={classNames} styles={stylesFnOTP} />
      <Search placeholder="Search" classNames={classNames} styles={stylesFnSearch} size="large" />
    </Flex>
  );
};

export default App;
