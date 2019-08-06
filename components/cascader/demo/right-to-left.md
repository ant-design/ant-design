---
order: 12
title:
  zh-CN: 右到左
  en-US: Right to left
  fa-IR: چپ به راست
---

## zh-CN

省市区级联。

## en-US

Cascader component supports right to left (rtl) direction if placed inside `ConfigProvider` with `direction='rtl'`

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
function filter(inputValue, path) {
  return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}
ReactDOM.render(
  <div>
    <ConfigProvider direction="rtl">
      <div>
        <Cascader
          suffixIcon={<Icon type="smile" />}
          options={options}
          onChange={onChange}
          placeholder="یک مورد انتخاب کنید"
          popupPlacement="bottomRight"
        />
        <br />
        <br />
        <br />
        With search:
        <br />
        <Cascader
          suffixIcon={<Icon type="search" />}
          options={options}
          onChange={onChange}
          placeholder="یک مورد انتخاب کنید"
          popupPlacement="bottomRight"
          showSearch={{ filter }}
        />
      </div>
    </ConfigProvider>
  </div>,
  mountNode,
);
```
