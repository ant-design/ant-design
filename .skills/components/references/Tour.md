# Tour — 漫游式引导

## 功能概述

用于分步引导用户了解产品功能的气泡组件。

## 输入字段

### 必填

- `steps`: TourStep[]，引导步骤配置数组。

### TourStep 结构

```tsx
interface TourStep {
  target: () => HTMLElement | null; // 目标元素
  title: ReactNode; // 标题
  description?: ReactNode; // 描述
  cover?: ReactNode; // 封面图
  placement?: Placement; // 引导卡片相对于目标元素的位置
  arrow?: boolean | { pointAtCenter }; // 箭头配置
  type?: 'default' | 'primary'; // 类型
  mask?: boolean | { style; color }; // 遮罩配置
  closeIcon?: ReactNode; // 关闭图标
  nextButtonProps?: ButtonProps; // 下一步按钮属性
  prevButtonProps?: ButtonProps; // 上一步按钮属性
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions; // 滚动配置
}
```

### 可选

- `open`: boolean，是否打开（受控）。
- `current`: number，当前步骤（受控，0 开始）。
- `type`: string，类型，可选 `default` | `primary`，默认 `default`。
- `placement`: Placement，引导卡片位置。
- `arrow`: boolean | { pointAtCenter }，箭头配置。
- `mask`: boolean | { style, color }，遮罩配置，默认 `true`。
- `gap`: { offset, radius }，高亮区域的间距。
- `animated`: boolean | { indicator, placeholder }，动画效果（5.14.0+）。
- `closeIcon`: ReactNode | boolean，关闭图标。
- `disabledInteraction`: boolean，禁用高亮区域内元素交互。
- `zIndex`: number，层级，默认 `1001`。
- `getPopupContainer`: (node) => HTMLElement，容器。
- `indicatorsRender`: (current, total) => ReactNode，自定义指示器。
- `scrollIntoViewOptions`: boolean | ScrollIntoViewOptions，滚动配置。
- `onChange`: (current) => void，步骤变化回调。
- `onClose`: (current) => void，关闭回调。
- `onFinish`: () => void，完成回调。

## 使用建议

新功能引导使用 Tour；步骤较多时提供跳过选项；配合 mask 聚焦用户注意力。

## 示例代码

```tsx
import { useRef, useState } from 'react';
import { Button, Space, Tour } from 'antd';
import type { TourProps } from 'antd';

const App: React.FC = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [open, setOpen] = useState(false);

  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      target: () => ref1.current,
    },
    {
      title: 'Save',
      description: 'Save your changes.',
      target: () => ref2.current,
    },
    {
      title: 'Other Actions',
      description: 'Click to see other actions.',
      target: () => ref3.current,
    },
  ];

  return (
    <>
      <Space>
        <Button ref={ref1}>Upload</Button>
        <Button ref={ref2} type="primary">
          Save
        </Button>
        <Button ref={ref3}>More</Button>
      </Space>

      <Button type="primary" onClick={() => setOpen(true)}>
        Begin Tour
      </Button>

      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
};

// 带封面图
const TourWithCover: React.FC = () => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button ref={ref} onClick={() => setOpen(true)}>
        Begin Tour
      </Button>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={[
          {
            title: 'Welcome',
            description: 'This is the first step.',
            cover: <img src="https://via.placeholder.com/300x150" alt="cover" />,
            target: () => ref.current,
          },
        ]}
      />
    </>
  );
};

// Primary 类型
const TourPrimary: React.FC = () => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button ref={ref} onClick={() => setOpen(true)}>
        Begin Tour
      </Button>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        type="primary"
        steps={[
          {
            title: 'Step 1',
            description: 'Primary type tour.',
            target: () => ref.current,
          },
        ]}
      />
    </>
  );
};
```

## 返回结果

渲染一个漫游式引导组件，用于分步引导用户。
