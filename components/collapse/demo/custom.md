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

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

ReactDOM.render(
  <Collapse
    bordered={false}
    defaultActiveKey={['1']}
    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
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
.site-collapse-custom-panel {
  background: #f7f7f7;
  border-radius: 2px;
  margin-bottom: 24px;
  border: 0px;
  overflow: hidden;
}
```

<style>
  .site-collapse-custom-panel {
    background: rgba(255,255,255,0.04);
  }
</style>
