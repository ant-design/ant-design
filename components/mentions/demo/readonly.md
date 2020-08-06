---
order: 4
title:
  zh-CN: 无效或只读
  en-US: disabled or readOnly
---

## zh-CN

通过 `disabled` 属性设置是否生效。通过 `readOnly` 属性设置是否只读。

## en-US

Configurate `disabled` and `readOnly`.

```jsx
import { Mentions } from '@allenai/varnish';

const { Option } = Mentions;

function getOptions() {
  return ['afc163', 'zombiej', 'yesmeck'].map(value => (
    <Option key={value} value={value}>
      {value}
    </Option>
  ));
}

function App() {
  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <Mentions style={{ width: '100%' }} placeholder="this is disabled Mentions" disabled>
          {getOptions()}
        </Mentions>
      </div>
      <Mentions style={{ width: '100%' }} placeholder="this is readOnly Mentions" readOnly>
        {getOptions()}
      </Mentions>
    </>
  );
}

ReactDOM.render(<App />, mountNode);
```
