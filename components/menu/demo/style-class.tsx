import React from 'react';
import { Flex, Menu } from 'antd';
import type { MenuProps, MenuSemanticAllType } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 1px solid #f0f0f0;
    max-width: 600px;
    padding: 8px;
    border-radius: 4px;
  `,
  item: css`
    color: #1677ff;
  `,
}));

const items: Required<MenuProps>['items'] = [
  {
    key: 'SubMenu',
    label: 'Navigation One',
    children: [
      {
        key: 'g1',
        label: 'Item 1',
        type: 'group',
        children: [
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
        ],
      },
    ],
  },
  { key: 'mail', label: 'Navigation Two' },
];

const styles: MenuSemanticAllType['styles'] = {
  root: { border: '1px solid #f0f0f0', padding: 8, borderRadius: 4 },
  item: { color: '#1677ff' },
  subMenu: { list: { color: '#fa541c' } },
};

const stylesFn: MenuSemanticAllType['stylesFn'] = (info): MenuSemanticAllType['styles'] => {
  const hasSub = info.props.items?.[0];
  return {
    root: {
      backgroundColor: hasSub ? 'rgba(240,249,255, 0.6)' : 'rgba(255,255,255)',
    },
  };
};

const App: React.FC = () => {
  const shareProps: MenuProps = {
    classNames,
    items,
  };

  return (
    <Flex vertical gap="middle">
      <Menu {...shareProps} styles={styles} />
      <Menu mode="inline" {...shareProps} styles={stylesFn} />
    </Flex>
  );
};

export default App;
