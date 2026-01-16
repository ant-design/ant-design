# Tour — 漫游式引导

## 功能概述

用于分步引导用户了解产品功能的气泡组件。

## 应用场景

- 常用于引导用户了解产品功能。

## 输入字段

### Tour 属性

#### 必填

- 无必填属性。

#### 可选

- `arrow`: `boolean` | `{ pointAtCenter: boolean}`，是否显示箭头，包含是否指向元素中心的配置，默认 `true`。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `closeIcon`: `React.ReactNode`，自定义关闭按钮，默认 `true`，版本 5.9.0。
- `disabledInteraction`: `boolean`，禁用高亮区域交互，默认 `false`，版本 5.13.0。
- `gap`: `{ offset?: number | [number, number]; radius?: number }`，控制高亮区域的圆角边框和显示间距，默认 `{ offset?: 6 ; radius?: 2 }`，版本 5.0.0 (数组类型的 `offset`: 5.9.0 )。
- `keyboard`: boolean，是否启用键盘快捷行为，默认 true，版本 6.2.0。
- `placement`: `center` `left` `leftTop` `leftBottom` `right` `rightTop` `rightBottom` `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight`，引导卡片相对于目标元素的位置，默认 `bottom`。
- `onClose`: `Function`，关闭引导时的回调函数。
- `onFinish`: `Function`，引导完成时的回调。
- `mask`: `boolean | { style?: React.CSSProperties; color?: string; }`，是否启用蒙层，也可传入配置改变蒙层样式和填充色，默认 `true`。
- `type`: `default` | `primary`，类型，影响底色与文字颜色，默认 `default`。
- `open`: `boolean`，打开引导。
- `onChange`: `(current: number) => void`，步骤改变时的回调，current 为当前的步骤。
- `current`: `number`，当前处于哪一步。
- `scrollIntoViewOptions`: `boolean | ScrollIntoViewOptions`，是否支持当前元素滚动到视窗内，也可传入配置指定滚动视窗的相关参数，默认 `true`，版本 5.2.0。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `indicatorsRender`: `(current: number, total: number) => ReactNode`，自定义指示器，版本 5.2.0。
- `actionsRender`: `(originNode: ReactNode, info: { current: number, total: number }) => ReactNode`，自定义操作按钮，版本 5.25.0。
- `zIndex`: number，Tour 的层级，默认 1001，版本 5.3.0。
- `getPopupContainer`: `(node: HTMLElement) => HTMLElement`，设置 Tour 浮层的渲染节点，默认是 body，默认 body，版本 5.12.0。

### TourStep 引导步骤卡片 属性

#### 必填

- 无必填属性。

#### 可选

- `target`: `() => HTMLElement` | `HTMLElement`，获取引导卡片指向的元素，为空时居中于屏幕。
- `arrow`: `boolean` | `{ pointAtCenter: boolean}`，是否显示箭头，包含是否指向元素中心的配置，默认 `true`。
- `closeIcon`: `React.ReactNode`，自定义关闭按钮，默认 `true`，版本 5.9.0。
- `cover`: `ReactNode`，展示的图片或者视频。
- `title`: `ReactNode`，标题。
- `description`: `ReactNode`，主要描述部分。
- `placement`: `center` `left` `leftTop` `leftBottom` `right` `rightTop` `rightBottom` `top` `topLeft` `topRight` `bottom` `bottomLeft` `bottomRight`，引导卡片相对于目标元素的位置，默认 `bottom`。
- `onClose`: `Function`，关闭引导时的回调函数。
- `mask`: `boolean | { style?: React.CSSProperties; color?: string; }`，是否启用蒙层，也可传入配置改变蒙层样式和填充色，默认跟随 Tour 的 `mask` 属性，默认 `true`。
- `type`: `default` | `primary`，类型，影响底色与文字颜色，默认 `default`。
- `nextButtonProps`: `{ children: ReactNode; onClick: Function }`，下一步按钮的属性。
- `prevButtonProps`: `{ children: ReactNode; onClick: Function }`，上一步按钮的属性。
- `scrollIntoViewOptions`: `boolean | ScrollIntoViewOptions`，是否支持当前元素滚动到视窗内，也可传入配置指定滚动视窗的相关参数，默认跟随 Tour 的 `scrollIntoViewOptions` 属性，默认 `true`，版本 5.2.0。

## 方法

无公开方法。

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
