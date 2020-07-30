---
order: 8
title:
  zh-CN: 自定义展开/折叠图标
  en-US: Customize collapse/expand icon
---

## zh-CN

自定义展开/折叠图标。

## en-US

customize collapse/expand icon of tree node

```jsx
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';

class Demo extends React.Component {
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  render() {
    return (
      <Tree
        showLine
        switcherIcon={<DownOutlined />}
        defaultExpandedKeys={['0-0-0']}
        onSelect={this.onSelect}
        treeData={[
          {
            title: 'parent 1',
            key: '0-0',
            children: [
              {
                title: 'parent 1-0',
                key: '0-0-0',
                children: [
                  {
                    title: 'leaf',
                    key: '0-0-0-0',
                  },
                  {
                    title: 'leaf',
                    key: '0-0-0-1',
                  },
                  {
                    title: 'leaf',
                    key: '0-0-0-2',
                  },
                ],
              },
              {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [
                  {
                    title: 'leaf',
                    key: '0-0-1-0',
                  },
                ],
              },
              {
                title: 'parent 1-2',
                key: '0-0-2',
                children: [
                  {
                    title: 'leaf',
                    key: '0-0-2-0',
                  },
                  {
                    title: 'leaf',
                    key: '0-0-2-1',
                  },
                ],
              },
            ],
          },
        ]}
      />
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
