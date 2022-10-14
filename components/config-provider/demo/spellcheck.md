---
order: 2
title:
  zh-CN: 拼写检查
  en-US: SpellCheck
---

## zh-CN

修改相应组件的拼写检查开关

## en-US

Toggle the spellCheck switch by ConfigProvider

```tsx
import { Input, InputNumber, Switch, ConfigProvider, Divider } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [isSpellCheck, setIsSpellCheck] = useState<boolean>(false);

  return (
    <div>
      <Switch
        checkedChildren="开启"
        unCheckedChildren="关闭"
        value={isSpellCheck}
        onChange={checked => setIsSpellCheck(checked)}
      />
      <Divider />
      <ConfigProvider
        input={{ spellCheck: isSpellCheck }}
        search={{ spellCheck: isSpellCheck }}
        textarea={{ spellCheck: isSpellCheck }}
        inputNumber={{ spellCheck: isSpellCheck }}
      >
        <div className="example">
          <Input defaultValue="sdf hello wwwdag" />
        </div>

        <div className="example">
          <Input.Search allowClear defaultValue="sdf hello wwwdag" />
        </div>
        <div className="example">
          <Input.TextArea allowClear defaultValue="sdf hello wwwdag" />
        </div>
        <div className="example">
          <InputNumber allowClear defaultValue="sdf hello" />
        </div>
      </ConfigProvider>
    </div>
  );
};

export default App;
```
