---
order: 12
debug: true
title:
  zh-CN: 右到左
  en-US: Right to left
  fa-IR: چپ به راست
---

## zh-CN

省市区级联。

## en-US

Rtl cascade selection box for selecting province/city/district.

```jsx
import { Cascader, ConfigProvider, Icon } from 'antd';
const options = [
  {
    value: 'tehran',
    label: 'تهران',
    children: [
      {
        value: 'damavand',
        label: 'دماوند',
        children: [
          {
            value: 'district-2',
            label: 'منطقه ۲',
          },
        ],
      },
    ],
  },
  {
    value: 'gilan',
    label: 'گیلان',
    children: [
      {
        value: 'rasht',
        label: 'رشت',
        children: [
          {
            value: 'district-3',
            label: 'منطقه ۳',
          },
        ],
      },
    ],
  },
];
function onChange(value) {
  console.log(value);
}
ReactDOM.render(
  <div>
    <ConfigProvider layoutDirection="rtl">
      <Cascader
        suffixIcon={<Icon type="smile" />}
        options={options}
        onChange={onChange}
        placeholder="یک مورد انتخاب کنید"
        popupPlacement="bottomRight"
      />
    </ConfigProvider>
  </div>,
  mountNode,
);
```
