---
order: 7
title:
  zh-CN: 无效或只读
  en-US: disabled or readOnly
---

## zh-CN

通过 `disabled` 属性设置是否生效。通过 `readOnly` 属性设置是否只读。

## en-US

Configurate `disabled` and `readOnly`.

```jsx
import { Mention } from 'antd';

const { toString } = Mention;

function onChange(editorState) {
  console.log(toString(editorState));
}

const users = ['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai'];

function App() {
  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <Mention
          style={{ width: '100%' }}
          onChange={onChange}
          placeholder="this is disabled Mention"
          suggestions={users}
          disabled
        />
      </div>
      <Mention
        style={{ width: '100%' }}
        onChange={onChange}
        placeholder="this is readOnly Mention"
        suggestions={users}
        readOnly
      />
    </div>
  );
}

ReactDOM.render(<App />, mountNode);
```
