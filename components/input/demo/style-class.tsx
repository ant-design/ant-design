import React from 'react';
import { Flex, Input } from 'antd';
import type { GetProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const styles = createStaticStyles(({ css, cssVar }) => ({
  focusEffect: css`
    border-width: ${cssVar.lineWidth};
    border-radius: ${cssVar.borderRadius};
    transition: box-shadow ${cssVar.motionDurationMid};
    &:hover {
      border: 1px solid #d9d9d9;
    }
    &:focus-visible {
      border-color: lab(66.128% 0 0);
      box-shadow: 0 0 0 4px color-mix(in oklab, lab(66.128% 0 0) 50%, transparent);
    }
  `,
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
      root: {
        borderColor: '#696FC7',
      },
    } satisfies InputProps['styles'];
  }
  return {};
};

const stylesFnTextArea: TextAreaProps['styles'] = (info) => {
  if (info.props.showCount) {
    return {
      root: { borderColor: '#BDE3C3' },
      textarea: { resize: 'none' },
      count: { color: '#BDE3C3' },
    } satisfies TextAreaProps['styles'];
  }
  return {};
};

const stylesFnPassword: PasswordProps['styles'] = (info) => {
  if (info.props.size === 'middle') {
    return {
      root: {
        borderColor: '#F5D3C4',
      },
    } satisfies PasswordProps['styles'];
  }
  return {};
};

const stylesFnOTP: OTPProps['styles'] = (info) => {
  if (info.props.size === 'middle') {
    return {
      input: {
        borderColor: '#6E8CFB',
        width: 32,
      },
    } satisfies OTPProps['styles'];
  }
  return {};
};

const stylesFnSearch: SearchProps['styles'] = (info) => {
  if (info.props.size === 'large') {
    return {
      root: { color: '#4DA8DA' },
      input: { color: '#4DA8DA', borderColor: '#4DA8DA' },
      prefix: { color: '#4DA8DA' },
      suffix: { color: '#4DA8DA' },
      count: { color: '#4DA8DA' },
      button: {
        root: { color: '#4DA8DA', borderColor: '#4DA8DA' },
        icon: { color: '#4DA8DA' },
      },
    } satisfies SearchProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const classNames = styles;
  return (
    <Flex vertical gap="large">
      <Input
        classNames={{ root: classNames.focusEffect }}
        placeholder="Object"
        name="input-object"
      />
      <Input
        classNames={classNames}
        styles={stylesFn}
        placeholder="Function"
        size="middle"
        name="input-fn"
      />
      <TextArea
        classNames={classNames}
        styles={stylesFnTextArea}
        value="TextArea"
        showCount
        name="textarea-fn"
      />
      <Password
        classNames={classNames}
        styles={stylesFnPassword}
        value="Password"
        size="middle"
        name="password-fn"
      />
      <OTP classNames={classNames} styles={stylesFnOTP} size="middle" length={6} separator="*" />
      <Search
        classNames={classNames}
        styles={stylesFnSearch}
        size="large"
        placeholder="Search"
        name="search-fn"
      />
    </Flex>
  );
};

export default App;
