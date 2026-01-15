# Rate — 评分

## 功能概述

评分组件。

## 输入字段

### 可选

- `value`: number，当前值（受控）。
- `defaultValue`: number，默认值，默认 `0`。
- `count`: number，星星总数，默认 `5`。
- `allowHalf`: boolean，允许半选，默认 `false`。
- `allowClear`: boolean，允许清除，默认 `true`。
- `disabled`: boolean，禁用。
- `tooltips`: string[]，每项的提示信息。
- `character`: ReactNode | (RateProps) => ReactNode，自定义字符。
- `style`: CSSProperties，样式。
- `className`: string，类名。
- `onChange`: (value) => void，值变化回调。
- `onHoverChange`: (value) => void，鼠标悬停回调。
- `onKeyDown`: (event) => void，键盘按下回调。
- `onFocus`: () => void，聚焦回调。
- `onBlur`: () => void，失焦回调。

## 使用建议

评价场景使用评分组件；需要半星时开启 allowHalf；配合 tooltips 提供评分说明。

## 示例代码

```tsx
import { useState } from 'react';
import {
  FrownOutlined,
  HeartFilled,
  HeartOutlined,
  MehOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Rate, Space } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = useState(3);

  return (
    <Space direction="vertical">
      {/* 基础用法 */}
      <Rate />

      {/* 半星 */}
      <Rate allowHalf defaultValue={2.5} />

      {/* 只读 */}
      <Rate disabled defaultValue={2} />

      {/* 提示 */}
      <Rate
        tooltips={['terrible', 'bad', 'normal', 'good', 'wonderful']}
        value={value}
        onChange={setValue}
      />
      <span>{value ? ['terrible', 'bad', 'normal', 'good', 'wonderful'][value - 1] : ''}</span>

      {/* 自定义字符 */}
      <Rate character={<HeartOutlined />} allowHalf />
      <Rate character="A" allowHalf />
      <Rate character="好" allowHalf />

      {/* 自定义不同字符 */}
      <Rate
        character={({ index = 0 }) => {
          const icons = [
            <FrownOutlined key="1" />,
            <FrownOutlined key="2" />,
            <MehOutlined key="3" />,
            <SmileOutlined key="4" />,
            <SmileOutlined key="5" />,
          ];
          return icons[index];
        }}
      />

      {/* 清除 */}
      <Rate allowClear defaultValue={3} />
      <Rate allowClear={false} defaultValue={3} />

      {/* 受控 */}
      <Rate value={value} onChange={setValue} />
    </Space>
  );
};
```

## 返回结果

渲染一个评分组件。
