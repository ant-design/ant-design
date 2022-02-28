---
order: 0
title:
  zh-CN: 动态数据
  en-US: Dynamic
---

## zh-CN

动态加载数据.

## en-US

Load options dynamically.

```jsx
import { useState } from 'react';
import { Segmented, Button } from 'antd';

const defaultOptions1 = ['iOS', 'Android', 'Web'];
const defaultOptions2 = [
  { label: 'iOS', value: 'iOS' },
  { label: 'Android', value: 'Android' },
  'Web',
];

const Demo: React.FC = () => {
  const [options1, setOptions1] = useState(defaultOptions1);
  const [options2, setOptions2] = useState(defaultOptions2);

  const handleLoadOptions1 = () => {
    setOptions1(r => r.concat('Electron', 'Mini App'));
  };

  const handleLoadOptions2 = () => {
    setOptions2([
      { label: 'Electron', value: 'Electron' },
      'Mini App',
      ...defaultOptions2.reverse(),
    ]);
  };

  return (
    <div>
      <Segmented options={options1} />
      <br />
      <Button type="primary" onClick={handleLoadOptions1} style={{ marginBottom: 10 }}>
        load option now
      </Button>
      <br />
      <Segmented options={options2} defaultValue="Android" />
      <br />
      <Button type="primary" onClick={handleLoadOptions2}>
        load option now
      </Button>
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```

```css
.code-box-demo {
  overflow-x: auto;
}

.code-box-demo .ant-segmented {
  margin-bottom: 10px;
}
```

<style>
[data-theme="dark"] .site-back-top-basic {
  color: rgba(255,255,255,.45);
}
</style>
