---
order: 5
title:
  zh-CN: 大小
  en-US: Size
-----------

## zh-CN

大中小三种组合，可以和表单输入框进行对应配合。

## en-US

There are three kinds of combination, large medium and small. It can coordinate with input box.

```jsx
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

ReactDOM.render(<div>
  <div>
    <RadioGroup defaultValue="a" size="large">
      <RadioButton value="a">杭州</RadioButton>
      <RadioButton value="b">上海</RadioButton>
      <RadioButton value="c">北京</RadioButton>
      <RadioButton value="d">成都</RadioButton>
    </RadioGroup>
  </div>
  <div style={{ marginTop: 16 }}>
    <RadioGroup defaultValue="a">
      <RadioButton value="a">杭州</RadioButton>
      <RadioButton value="b">上海</RadioButton>
      <RadioButton value="c">北京</RadioButton>
      <RadioButton value="d">成都</RadioButton>
    </RadioGroup>
  </div>
  <div style={{ marginTop: 16 }}>
    <RadioGroup defaultValue="a" size="small">
      <RadioButton value="a">杭州</RadioButton>
      <RadioButton value="b">上海</RadioButton>
      <RadioButton value="c">北京</RadioButton>
      <RadioButton value="d">成都</RadioButton>
    </RadioGroup>
  </div>
</div>, mountNode);
```
