import React from 'react';
import { Flex, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(() => ({
  root: { border: '1px solid #f0f0f0', maxWidth: 600, padding: 8, borderRadius: 4 },
  item: { color: '#1677ff' },
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

const styles: MenuProps['styles'] = {
  root: { border: '1px solid #f0f0f0', padding: 8, borderRadius: 4 },
  item: { color: '#1677ff' },
  subMenu: { list: { color: '#fa541c' } },
};

const stylesFn: MenuProps['styles'] = (info) => {
  const hasSub = info.props.items?.[0];
  return {
    root: {
      backgroundColor: hasSub ? 'rgba(240,249,255, 0.6)' : 'rgba(255,255,255)',
    },
  } satisfies MenuProps['styles'];
};

const App: React.FC = () => {
  const { styles: classNames } = useStyle();

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
