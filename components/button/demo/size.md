---
order: 2
title:
  zh-CN: 按钮尺寸
  en-US: Size
---

## zh-CN

按钮有大、中、小三种尺寸。

通过设置 `size` 为 `large` `small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中。

## en-US

Ant Design supports a default button size as well as a large and small size.

If a large or small button is desired, set the `size` property to either `large` or `small` respectively. Omit the `size` property for a button with the default size.

````jsx
import { Button } from 'antd';

ReactDOM.render(<div>
  <Button type="primary" size="large">Large</Button>
  <Button type="primary">Default</Button>
  <Button type="primary" size="small">Small</Button>
</div>, mountNode);
````
