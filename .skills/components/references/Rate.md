# Rate — 评分

## 功能概述

用于对事物进行评分操作。

## 应用场景

- 对评价进行展示。
- 对事物进行快速的评级操作。

## 输入字段

### Rate 属性

#### 必填

- 无必填属性。

#### 可选

- `allowClear`: boolean，是否允许再次点击后清除，默认 true。
- `allowHalf`: boolean，是否允许半选，默认 false。
- `character`: ReactNode | (RateProps) => ReactNode，自定义字符，默认 <StarFilled />，版本 function(): 4.4.0。
- `className`: string，自定义样式类名。
- `count`: number，star 总数，默认 5。
- `defaultValue`: number，默认值，默认 0。
- `disabled`: boolean，只读，无法进行交互，默认 false。
- `keyboard`: boolean，支持使用键盘操作，默认 true，版本 5.18.0。
- `size`: 'small' | 'middle' | 'large'，星星尺寸，默认 'middle'。
- `style`: CSSProperties，自定义样式对象。
- `tooltips`: [TooltipProps](/components/tooltip-cn#api)[] | string\[]，自定义每项的提示信息。
- `value`: number，当前数，受控值。
- `onBlur`: function()，失去焦点时的回调。
- `onChange`: function(value: number)，选择时的回调。
- `onFocus`: function()，获取焦点时的回调。
- `onHoverChange`: function(value: number)，鼠标经过时数值变化的回调。
- `onKeyDown`: function(event)，按键回调。

## 方法

- `blur()`: 移除焦点
- `focus()`: 获取焦点

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
      <Rate />

      <Rate allowHalf defaultValue={2.5} />

      <Rate disabled defaultValue={2} />

      <Rate
        tooltips={['terrible', 'bad', 'normal', 'good', 'wonderful']}
        value={value}
        onChange={setValue}
      />
      <span>{value ? ['terrible', 'bad', 'normal', 'good', 'wonderful'][value - 1] : ''}</span>

      <Rate character={<HeartOutlined />} allowHalf />
      <Rate character="A" allowHalf />
      <Rate character="好" allowHalf />

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

      <Rate allowClear defaultValue={3} />
      <Rate allowClear={false} defaultValue={3} />

      <Rate value={value} onChange={setValue} />
    </Space>
  );
};
```

## 返回结果

渲染一个评分组件。
