---
order: 9
title:
  zh-CN: 多彩徽标
  en-US: Colorful Badge
---

## zh-CN

我们添加了多种预设色彩的徽标样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。

## en-US

We preset a series of colorful Badge styles for use in different situations. You can also set it to a hex color string for custom color.

```tsx
import { Badge, Divider, Row, Col } from 'antd';
import React from 'react';

const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];

const App: React.FC = () => (
  <>
    <Divider orientation="left">Presets</Divider>
    <Row>
      <Col span={4}>
        {colors.map(color => (
          <div key={color}>
            <Badge color={color} text={color} count={0} />
          </div>
        ))}
      </Col>
      <Col span={20}>
        {colors.map(color => (
          <div key={color} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <Badge color={color} count={44}>
              <div
                style={{
                  width: 90,
                  height: 90,
                  lineHeight: '90px',
                  background: '#ccc',
                  textAlign: 'center',
                  marginBottom: 10,
                }}
              >
                {color}
              </div>
            </Badge>
          </div>
        ))}
      </Col>
    </Row>
    <Divider orientation="left">Custom</Divider>
    <>
      <Badge color="#f50" text="#f50" />
      <br />
      <Badge color="#2db7f5" text="#2db7f5" />
      <br />
      <Badge color="#87d068" text="#87d068" />
      <br />
      <Badge color="#108ee9" text="#108ee9" />
    </>
  </>
);

export default App;
```

```css
.ant-tag {
  margin-bottom: 8px;
}
```
