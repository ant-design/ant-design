import React, { useState } from 'react';
import { Button, Space, Switch, Typography } from 'antd';
import type { CSSProperties } from 'react';

type ButtonSemanticName = 'root' | 'content' | 'icon';

const classNamesObject: Partial<Record<ButtonSemanticName, string>> = {
  root: 'demo-btn-root',
  content: 'demo-btn-content',
  icon: 'demo-btn-icon',
};

const classNamesFn = (info: { props: { type?: 'primary' | 'default' | string } }) => {
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

const stylesFn = (info: {
  props: { type?: 'primary' | 'default' | string; disabled?: boolean };
}) => {
  if (info.props.disabled) {
    return { root: { opacity: 0.5, cursor: 'not-allowed', borderColor: 'red' } };
  }
  if (info.props.type === 'primary') {
    return { root: { backgroundColor: '#e6f4ff', borderColor: '#1677ff' } };
  }
  return { root: { backgroundColor: '#fafafa', borderColor: '#d9d9d9' } };
};

const App: React.FC = () => {
  const [isPrimary, setIsPrimary] = useState(true);
  const [disabled, setDisabled] = useState(false);

  return (
    <Space size="large" style={{ width: '100%' }}>
      <Space align="center" wrap>
        <Typography.Text>Toggle type:</Typography.Text>
        <Switch
          aria-label="Toggle primary type"
          checkedChildren="primary"
          unCheckedChildren="default"
          checked={isPrimary}
          onChange={setIsPrimary}
        />

        <Typography.Text>Disabled:</Typography.Text>
        <Switch checked={disabled} aria-label="Toggle disabled" onChange={setDisabled} />
      </Space>

      <Space wrap>
        <Button
          disabled={disabled}
          type={isPrimary ? 'primary' : 'default'}
          classNames={classNamesObject}
        >
          classNames Object
        </Button>

        <Button
          disabled={disabled}
          type={isPrimary ? 'primary' : 'default'}
          classNames={classNamesFn}
        >
          classNames Function
        </Button>

        <Button disabled={disabled} type={isPrimary ? 'primary' : 'default'} styles={stylesObject}>
          styles Object
        </Button>

        <Button disabled={disabled} type={isPrimary ? 'primary' : 'default'} styles={stylesFn}>
          styles Function
        </Button>
      </Space>
    </Space>
  );
};

export default App;
