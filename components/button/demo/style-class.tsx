import React from 'react';
import { Button, Space, Flex } from 'antd';
import type { CSSProperties } from 'react';
import type { BaseButtonProps } from 'antd/es/button/button';

type ButtonSemanticName = 'root' | 'content' | 'icon';

const classNamesObject: Partial<Record<ButtonSemanticName, string>> = {
  root: 'demo-btn-root',
  content: 'demo-btn-content',
  icon: 'demo-btn-icon',
};

const classNamesFn = (info: { props: BaseButtonProps }) => {
  if (info.props.type === 'primary') {
    return { root: 'demo-btn-root--primary' };
  }
  return { root: 'demo-btn-root--default' };
};

const stylesObject: Partial<Record<ButtonSemanticName, CSSProperties>> = {
  root: { borderWidth: 2, borderStyle: 'dashed' },
  content: { fontStyle: 'italic' },
  icon: { opacity: 0.85 },
};

const stylesFn = (info: { props: BaseButtonProps }) => {
  if (info.props.disabled) {
    return { root: { opacity: 0.5, cursor: 'not-allowed', borderColor: 'red' } };
  }
  return { root: { backgroundColor: '#fafafa', borderColor: '#d9d9d9' } };
};

const App: React.FC = () => {
  return (
    <Space size={[8, 16]} wrap>
      <Flex gap="small">
        <Button type="default" classNames={classNamesObject}>
          classNames Object
        </Button>
        <Button type="primary" disabled classNames={classNamesFn}>
          classNames Function
        </Button>
      </Flex>
      <Flex gap="small">
        <Button type="default" styles={stylesObject}>
          styles Object
        </Button>
        <Button type="primary" disabled styles={stylesFn}>
          styles Function
        </Button>
      </Flex>
    </Space>
  );
};

export default App;
