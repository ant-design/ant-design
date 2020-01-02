---
order: 2
title:
  zh-CN: 组件尺寸
  en-US: Component size
---

## zh-CN

修改默认组件尺寸。

## en-US

Config component default size.

```jsx
import { ConfigProvider, Radio, Input, Button, Select, DatePicker, Divider } from 'antd';

const FormSizeDemo = () => {
  const [componentSize, setComponentSize] = React.useState('default');
  return (
    <div>
      <Radio.Group
        value={componentSize}
        onChange={e => {
          setComponentSize(e.target.value);
        }}
      >
        <Radio.Button value="small">Small</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="large">Large</Radio.Button>
      </Radio.Group>
      <Divider />
      <ConfigProvider componentSize={componentSize}>
        <div className="example">
          <Input />
        </div>
        <div className="example">
          <Select defaultValue="demo" options={[{ value: 'demo' }]} />
        </div>
        <div className="example">
          <DatePicker />
        </div>
        <div className="example">
          <Button>Button</Button>
        </div>
      </ConfigProvider>
    </div>
  );
};
ReactDOM.render(<FormSizeDemo />, mountNode);
```
