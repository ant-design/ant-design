# Steps — 步骤条

## 功能概述

引导用户按照流程完成任务的导航条。

## 应用场景

- 当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

## 输入字段

### Steps 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `current`: number，指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 `status` 属性覆盖状态，默认 0。
- `~~direction~~`: string，指定步骤条方向。目前支持水平（`horizontal`）和竖直（`vertical`）两种方向，默认 `horizontal`。
- `iconRender`: (oriNode, info: { index, active, item }) => ReactNode，自定义渲染图标，请优先使用 `items.icon`。
- `initial`: number，起始序号，从 0 开始记数，默认 0。
- `~~labelPlacement~~`: string，指定标签放置位置，默认水平放图标右侧，可选 `vertical` 放图标下方，默认 `horizontal`。
- `orientation`: string，指定步骤条方向。目前支持水平（`horizontal`）和竖直（`vertical`）两种方向，默认 `horizontal`。
- `percent`: number，当前 `process` 步骤显示的进度条进度（只对基本类型的 Steps 生效），版本 4.5.0。
- `progressDot`: boolean | (iconDot, { index, status, title, content }) => ReactNode，点状步骤条，可以设置为一个 function，`titlePlacement` 将强制为 `vertical`，默认 false。
- `responsive`: boolean，当屏幕宽度小于 `532px` 时自动变为垂直模式，默认 true。
- `size`: string，指定大小，目前支持普通（`default`）和迷你（`small`），默认 `default`。
- `status`: string，指定当前步骤的状态，可选 `wait` `process` `finish` `error`，默认 `process`。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `titlePlacement`: string，指定标签放置位置，默认水平放图标右侧，可选 `vertical` 放图标下方，默认 `horizontal`。
- `type`: string，步骤条类型，可选 `default` `dot` `inline` `navigation` `panel`，默认 `default`。
- `variant`: `filled` | `outlined`，设置样式变体，默认 `filled`。
- `onChange`: (current) => void，点击切换步骤时触发。
- `items`: [StepItem](#stepitem)，配置选项卡内容，默认 []，版本 4.24.0。

### StepItem 属性

#### 必填

- 无必填属性。

#### 可选

- `content`: ReactNode，步骤的详情描述，可选。
- `~~description~~`: ReactNode，步骤的详情描述，可选。
- `disabled`: boolean，禁用点击，默认 false。
- `icon`: ReactNode，步骤图标的类型，可选。
- `status`: string，指定状态。当不配置该属性时，会使用 Steps 的 `current` 来自动指定状态。可选：`wait` `process` `finish` `error`，默认 `wait`。
- `subTitle`: ReactNode，子标题。
- `title`: ReactNode，标题。

## 方法

无公开方法。

## 使用建议

流程类业务使用步骤条；步骤较多时使用垂直方向；简洁展示使用点状步骤条。

## 示例代码

```tsx
import { useState } from 'react';
import { Button, message, Space, Steps } from 'antd';

const steps = [
  { title: 'First', description: 'This is description.' },
  { title: 'Second', description: 'This is description.' },
  { title: 'Last', description: 'This is description.' },
];

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Steps current={1} items={steps} />

      <Steps size="small" current={1} items={steps} />

      <Steps
        items={[
          { title: 'Login', status: 'finish', icon: <UserOutlined /> },
          { title: 'Verification', status: 'process', icon: <SolutionOutlined /> },
          { title: 'Pay', status: 'wait', icon: <LoadingOutlined /> },
          { title: 'Done', status: 'wait', icon: <SmileOutlined /> },
        ]}
      />

      <Steps current={current} onChange={setCurrent} items={steps} />

      <Steps direction="vertical" current={1} items={steps} />

      <Steps progressDot current={1} items={steps} />

      <Steps status="error" current={1} items={steps} />

      <Steps type="navigation" current={current} onChange={setCurrent} items={steps} />
    </Space>
  );
};
```

## 返回结果

渲染一个步骤条，用于展示任务进度。
