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

class App extends React.Component {
  gutters = {};

  vgutters = {};

  colCounts = {};

  constructor() {
    super();
    this.state = {
      gutterKey: 1,
      vgutterKey: 1,
      colCountKey: 2,
    };
    [8, 16, 24, 32, 40, 48].forEach((value, i) => {
      this.gutters[i] = value;
    });
    [8, 16, 24, 32, 40, 48].forEach((value, i) => {
      this.vgutters[i] = value;
    });
    [2, 3, 4, 6, 8, 12].forEach((value, i) => {
      this.colCounts[i] = value;
    });
  }

  onGutterChange = gutterKey => {
    this.setState({ gutterKey });
  };

  onVGutterChange = vgutterKey => {
    this.setState({ vgutterKey });
  };

  onColCountChange = colCountKey => {
    this.setState({ colCountKey });
  };

  render() {
    const { gutterKey, vgutterKey, colCountKey } = this.state;
    const cols = [];
    const colCount = this.colCounts[colCountKey];
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
              max={Object.keys(this.gutters).length - 1}
              value={gutterKey}
              onChange={this.onGutterChange}
              marks={this.gutters}
              step={null}
            />
          </div>
          <span style={{ marginRight: 6 }}>Vertical Gutter (px): </span>
          <div style={{ width: '50%' }}>
            <Slider
              min={0}
              max={Object.keys(this.vgutters).length - 1}
              value={vgutterKey}
              onChange={this.onVGutterChange}
              marks={this.vgutters}
              step={null}
            />
          </div>
          <span style={{ marginRight: 6 }}>Column Count:</span>
          <div style={{ width: '50%' }}>
            <Slider
              min={0}
              max={Object.keys(this.colCounts).length - 1}
              value={colCountKey}
              onChange={this.onColCountChange}
              marks={this.colCounts}
              step={null}
            />
          </div>
        </div>
        <Row gutter={[this.gutters[gutterKey], this.vgutters[vgutterKey]]}>{cols}</Row>
        <Row gutter={[this.gutters[gutterKey], this.vgutters[vgutterKey]]}>{cols}</Row>
        <pre>{`<Row gutter={[${this.gutters[gutterKey]}, ${this.vgutters[vgutterKey]}]}>\n${colCode}</Row>`}</pre>
        <pre>{`<Row gutter={[${this.gutters[gutterKey]}, ${this.vgutters[vgutterKey]}]}>\n${colCode}</Row>`}</pre>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
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

<style>
[data-theme="dark"] #components-grid-demo-playground [class~='ant-col'] > div {
  background: #028ac8;
}
</style>
