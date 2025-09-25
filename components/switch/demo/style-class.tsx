import React from 'react';
import { Switch, Space, Flex } from 'antd';
import type { SwitchProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
  root: css`
    border-color: red;
  `,
  content: css`
    color: black;
  `,
}));

const stylesObject: SwitchProps['styles'] = {
  root: { background: 'red' },
};

const App: React.FC = () => {
  const { styles } = useStyle();

  const classNamesFn: SwitchProps['classNames'] = (info) => {
    if (info.props.size === 'small') {
      return {
        root: styles.root,
        content: styles.content,
      };
    }

    return {};
  };

  return (
    <Space size={[8, 16]} wrap>
      <Flex gap="small">
        <Switch
          size="small"
          checkedChildren="on"
          unCheckedChildren="off"
          classNames={classNamesFn}
        />
      </Flex>
      <Flex gap="small">
        <Switch styles={stylesObject} />
      </Flex>
    </Space>
  );
};

export default App;
