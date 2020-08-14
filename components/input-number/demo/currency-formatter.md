---
order: 6
title:
  zh-CN: 格式化展示
  en-US: Currency Formatter using Intl
---

## zh-CN

<!-- 通过 `formatter` 格式化数字，以展示具有具体含义的数据，往往需要配合 `parser` 一起使用。 -->

## en-US

Implement currency parsing and formatting using [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

```jsx
import { useState } from 'react';
import { InputNumber, Select } from 'antd';
const { Option } = Select;

const locale = 'en-us';

const currencyFormatter = currency => value => {
  console.log({ value, locale, currency });
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

const currencyParser = val => {
  try {
    // for when the input gets clears
    if (typeof val === 'string' && !val.length) {
      val = '0.0';
    }

    // detecting and parsing between comma and dot
    var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
    var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
    var reversedVal = val.replace(new RegExp('\\' + group, 'g'), '');
    reversedVal = reversedVal.replace(new RegExp('\\' + decimal, 'g'), '.');
    //  => 1232.21 €

    // removing everything except the digits and dot
    reversedVal = reversedVal.replace(/[^0-9.]/g, '');
    //  => 1232.21

    // appending digits properly
    const digitsAfterDecimalCount = (reversedVal.split('.')[1] || []).length;
    const needsDigitsAppended = digitsAfterDecimalCount > 2;

    if (needsDigitsAppended) {
      reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
    }

    return Number.isNaN(reversedVal) ? 0 : reversedVal;
  } catch (error) {
    console.error(error);
  }
};

const currencyOptions = ['USD', 'EUR', 'INR'];

const App = () => {
  const [currency, setCurrency] = useState('USD');
  return (
    <>
      <InputNumber
        defaultValue={10000000}
        style={{ width: 200, marginRight: '1rem' }}
        formatter={currencyFormatter(currency)}
        parser={currencyParser}
      />

      <Select showSearch value={currency} style={{ width: 120 }} onChange={setCurrency}>
        {currencyOptions.map(opt => (
          <Option key={opt} value={opt}>
            {opt}
          </Option>
        ))}
      </Select>
    </>
  );
};

ReactDOM.render(<App />, mountNode);
```
