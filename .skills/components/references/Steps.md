# Steps — 步骤条

## 功能概述

引导用户按照流程完成任务的导航条。用于分步骤展示任务进度。

## 输入字段

### 必填

- `items`: StepItem[]，步骤项配置数组。

### StepItem 结构

```tsx
interface StepItem {
  title: ReactNode; // 标题
  subTitle?: ReactNode; // 副标题
  description?: ReactNode; // 描述
  icon?: ReactNode; // 图标
  status?: 'wait' | 'process' | 'finish' | 'error'; // 状态
  disabled?: boolean; // 禁用
}
```

### 可选

- `current`: number，当前步骤（从 0 开始）。
- `initial`: number，起始步骤，默认 `0`。
- `status`: string，当前步骤状态，可选 `wait` | `process` | `finish` | `error`，默认 `process`。
- `type`: string，步骤条类型，可选 `default` | `navigation` | `inline`，默认 `default`。
- `direction`: string，步骤条方向，可选 `horizontal` | `vertical`，默认 `horizontal`。
- `size`: string，尺寸，可选 `default` | `small`，默认 `default`。
- `labelPlacement`: string，标签位置，可选 `horizontal` | `vertical`，默认 `horizontal`。
- `progressDot`: boolean | (dot, info) => ReactNode，点状步骤条。
- `responsive`: boolean，响应式（屏幕小于 532px 时自动变为垂直方向），默认 `true`。
- `percent`: number，当前步骤的进度百分比（5.5.0+）。
- `onChange`: (current) => void，点击切换步骤回调。

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
      {/* 基础用法 */}
      <Steps current={1} items={steps} />

      {/* 迷你版 */}
      <Steps size="small" current={1} items={steps} />

      {/* 带图标 */}
      <Steps
        items={[
          { title: 'Login', status: 'finish', icon: <UserOutlined /> },
          { title: 'Verification', status: 'process', icon: <SolutionOutlined /> },
          { title: 'Pay', status: 'wait', icon: <LoadingOutlined /> },
          { title: 'Done', status: 'wait', icon: <SmileOutlined /> },
        ]}
      />

      {/* 可点击切换 */}
      <Steps current={current} onChange={setCurrent} items={steps} />

      {/* 垂直方向 */}
      <Steps direction="vertical" current={1} items={steps} />

      {/* 点状 */}
      <Steps progressDot current={1} items={steps} />

      {/* 错误状态 */}
      <Steps status="error" current={1} items={steps} />

      {/* 导航类型 */}
      <Steps type="navigation" current={current} onChange={setCurrent} items={steps} />
    </Space>
  );
};
```

## 返回结果

渲染一个步骤条，用于展示任务进度。
