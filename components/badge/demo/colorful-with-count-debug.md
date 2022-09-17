---
order: 101
title:
  zh-CN: 多彩徽标支持 count 显示 Debug
  en-US: Colorful Badge support count Debug
debug: true
---

## zh-CN

在使用多彩徽标的同时，支持 count 属性显示

## en-US

support `count` when use colorful badge

```tsx
import { Badge } from 'antd';
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
  </>
);

export default App;
```

```css
.ant-tag {
  margin-bottom: 8px;
}
```
