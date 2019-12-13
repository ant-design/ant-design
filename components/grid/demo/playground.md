---
order: 10
title:
  zh-CN: 栅格配置器
  en-US: Playground
---

## zh-CN

可以简单配置几种等分栅格和间距。

## en-US

A simple playground for column count and gutter.

```jsx
import { Row, Col, Slider } from 'antd';
import { useState, useEffect } from 'react';

const gutters = {};
const vgutters = {};
const colCounts = {};
const Demo = () => {
  const [gutterKey, setGutterKey] = useState(1);
  const [vgutterKey, setVgutterKey] = useState(1);
  const [colCountKey, setColCountKey] = useState(2);

  useEffect(() => {
    [8, 16, 24, 32, 40, 48].forEach((value, i) => {
      gutters[i] = value;
    });
    [8, 16, 24, 32, 40, 48].forEach((value, i) => {
      vgutters[i] = value;
    });
    [2, 3, 4, 6, 8, 12].forEach((value, i) => {
      colCounts[i] = value;
    });
  }, []);

  const cols = [];
  const colCount = colCounts[colCountKey];
  let colCode = '';
  for (let i = 0; i < colCount; i++) {
    cols.push(
      <Col key={i.toString()} span={24 / colCount}>
        <div>Column</div>
      </Col>,
    );
    colCode += `  <Col span={${24 / colCount}} />\n`;
  }
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 6 }}>Horizontal Gutter (px): </span>
        <div style={{ width: '50%' }}>
          <Slider
            min={0}
            max={Object.keys(gutters).length - 1}
            value={gutterKey}
            onChange={setGutterKey}
            marks={gutters}
            step={null}
          />
        </div>
        <span style={{ marginRight: 6 }}>Vertical Gutter (px): </span>
        <div style={{ width: '50%' }}>
          <Slider
            min={0}
            max={Object.keys(vgutters).length - 1}
            value={vgutterKey}
            onChange={setVgutterKey}
            marks={vgutters}
            step={null}
          />
        </div>
        <span style={{ marginRight: 6 }}>Column Count:</span>
        <div style={{ width: '50%' }}>
          <Slider
            min={0}
            max={Object.keys(colCounts).length - 1}
            value={colCountKey}
            onChange={setColCountKey}
            marks={colCounts}
            step={null}
          />
        </div>
      </div>
      <Row gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>{cols}</Row>
      <Row gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>{cols}</Row>
      <pre>{`<Row gutter={[${gutters[gutterKey]}, ${vgutters[vgutterKey]}]}>\n${colCode}</Row>`}</pre>
      <pre>{`<Row gutter={[${gutters[gutterKey]}, ${vgutters[vgutterKey]}]}>\n${colCode}</Row>`}</pre>
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

```css
#components-grid-demo-playground [class~='ant-col'] {
  background: transparent;
  border: 0;
}
#components-grid-demo-playground [class~='ant-col'] > div {
  background: #00a0e9;
  height: 120px;
  line-height: 120px;
  font-size: 13px;
}
#components-grid-demo-playground pre {
  background: #f9f9f9;
  border-radius: 6px;
  font-size: 13px;
  padding: 8px 16px;
}
```
