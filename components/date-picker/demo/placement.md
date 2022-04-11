---
order: 28
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

可以通过 `placement` 手动指定弹出的位置。

## en-US

You can manually specify the position of the popup via `placement`.

```jsx
import { DatePicker, Space, Radio } from 'antd';

const { RangePicker } = DatePicker;

const SetPlacementDemo = () => {
  const [placement, SetPlacement] = React.useState('topLeft');

  const placementChange = e => {
    SetPlacement(e.target.value);
  };

  return (
    <>
      <Radio.Group value={placement} onChange={placementChange}>
        <Radio.Button value="topLeft">topLeft</Radio.Button>
        <Radio.Button value="topRight">topRight</Radio.Button>
        <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
        <Radio.Button value="bottomRight">bottomRight</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <DatePicker placement={placement} />
      <br />
      <br />
      <RangePicker placement={placement} />
    </>
  );
};

export default () => <SetPlacementDemo />;
```
