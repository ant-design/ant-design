---
order: 1
title:
  zh-CN: 提示语
  en-US: tip
---

## zh-CN

可以通过`tip`属性和`isError`属性设置提示语以及提示语的颜色

## en-US

You can set the prompt language and the color of the prompt language through the `tip` property and the `isError` property

```jsx
import { Input } from 'infrad';
import { IUser } from 'infra-design-icons';

ReactDOM.render(
  <>
    <Input placeholder="large size" prefix={<IUser />} tip="提示语" />
    <br />
    <br />
    <Input placeholder="default size" prefix={<IUser />} tip="提示语" isError={true} />
  </>,
  mountNode,
);
```
