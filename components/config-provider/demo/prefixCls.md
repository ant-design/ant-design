---
order: 99
title:
  zh-CN: 前缀
  en-US: prefixCls
debug: true
only: true
---

## zh-CN

修改组件和图标前缀。

## en-US

Config component and icon prefixCls.

```jsx
import { ConfigProvider, Select } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

// Ant Design site use `es` module for view
// but do not replace related lib `lib` with `es`
// which do not show correct in site.
// We may need do convert in site also.
const FormSizeDemo = () => (
  <ConfigProvider prefixCls="light" iconPrefixCls="bamboo">
    <SmileOutlined />
    <Select />
  </ConfigProvider>
);
ReactDOM.render(<FormSizeDemo />, mountNode);
```
