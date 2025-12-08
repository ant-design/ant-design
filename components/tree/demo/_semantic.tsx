import React from 'react';
import {
  DownOutlined,
  FrownFilled,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Tree } from 'antd';
import type { TreeDataNode } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，设置树形控件的基础样式、布局和容器控制',
    item: '条目元素，设置树节点的基础样式、拖拽状态、角色属性、缩进、切换器、内容包装器等节点结构',
    itemTitle: '标题元素，设置树节点标题文字的显示样式和文本内容',
    itemIcon: '图标元素，设置树节点图标的样式、尺寸和状态显示',
  },
  en: {
    root: 'Root element with tree control base styles, layout and container control',
    item: 'Item element with tree node base styles, drag state, role attributes, indentation, switcher, content wrapper and other node structure',
    itemTitle: 'Title element with tree node title text display styles and text content',
    itemIcon: 'Icon element with tree node icon styles, size and state display',
  },
};

const treeData: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <SmileOutlined />,
    children: [
      {
        title: 'leaf',
        key: '0-0-0',
        icon: <MehOutlined />,
      },
      {
        title: 'leaf',
        key: '0-0-1',
        icon: ({ selected }) => (selected ? <FrownFilled /> : <FrownOutlined />),
      },
    ],
  },
];
const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Tree"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'item', desc: locale.item, version: '6.0.0' },
        { name: 'itemIcon', desc: locale.itemIcon, version: '6.0.0' },
        { name: 'itemTitle', desc: locale.itemTitle, version: '6.0.0' },
      ]}
    >
      <Tree
        showIcon
        defaultExpandAll
        defaultSelectedKeys={['0-0-0']}
        switcherIcon={<DownOutlined />}
        treeData={treeData}
      />
    </SemanticPreview>
  );
};

export default App;
