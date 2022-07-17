---
order: 3
title:
  zh-CN: 自定义面板
  en-US: Custom Panel
---

## zh-CN

自定义各个面板的背景色、圆角、边距和图标。

## en-US

Customize the background, border, margin styles and icon for each panel.

```jsx
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

ReactDOM.render(
  <Collapse
    bordered={false}
    defaultActiveKey={['1']}
    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
    className="site-collapse-custom-collapse"
  >
    <Panel header="This is panel header 1" key="1" className="site-collapse-custom-panel">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 2" key="2" className="site-collapse-custom-panel">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 3" key="3" className="site-collapse-custom-panel">
      <p>{text}</p>
    </Panel>
  </Collapse>,
  mountNode,
);
```

```css
[data-theme='compact'] .site-collapse-custom-collapse .site-collapse-custom-panel,
.site-collapse-custom-collapse .site-collapse-custom-panel {
  margin-bottom: 24px;
  overflow: hidden;
  background: #f7f7f7;
  border: 0px;
  border-radius: 2px;
}
```

<style>
  [data-theme="dark"] .site-collapse-custom-collapse .site-collapse-custom-panel {
    background: rgba(255,255,255,0.04);
    border: 0px;
  }
</style>
