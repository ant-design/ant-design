---
order: 38
title:
  zh-CN: 弹出位置
  en-US: Placement
---

## zh-CN

可以通过 `placement` 手动指定弹出的位置。

## en-US

You can manually specify the position of the popup via `placement`.

```jsx
import { Select, Radio } from 'antd';

const { Option } = Select;

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
      <Select
        defaultValue="HangZhou"
        style={{ width: 120 }}
        dropdownMatchSelectWidth={false}
        placement={placement}
      >
        <Option value="HangZhou">HangZhou #310000</Option>
        <Option value="NingBo">NingBo #315000</Option>
        <Option value="WenZhou">WenZhou #325000</Option>
      </Select>
    </>
  );
};

export default () => <SetPlacementDemo />;
```
