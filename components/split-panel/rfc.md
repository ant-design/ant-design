## Motivation

分割面板用于，隔离区域，并支持拖拽操作。

## Components

- SplitPanel
  - 对外暴露组件
- Panel
  - 面板组件
- SplitBar
  - 操作组件

## API

#### SplitPanel

| Props        | Descriptions | Type                       | Default      |
| ------------ | ------------ | -------------------------- | ------------ |
| layout       | 布局方向     | `horizontal` \| `vertical` | `horizontal` |
| height       | 高度         | `number`                   | -            |
| items        | 面板配置     | `SplitPanelItem`           | -            |
| splitBarSize | 操作元素大小 | `number`                   | `4`          |

#### SplitPanelItem

| Props       | Descriptions     | Type        | Default |
| ----------- | ---------------- | ----------- | ------- |
| collapsible | 快速折叠         | `boolean`   | `false` |
| min         | 最小阈值         | `number`    | -       |
| max         | 最大阈值         | `number`    | -       |
| size        | 分割的大小       | `number`    | -       |
| content     | 当前面板的内容   | `ReactNode` | -       |
| resizable   | 是否支持拖拽伸缩 | `boolean`   | `true`  |

## Example

```ts
const App: React.FC = () => (
  <SplitPanel
    height={300}
    items={[
      {
        // size: layout === 'horizontal' ? 20 : 10,
        content: <div>111</div>,
        resizable: false,
        collapsible: true,
      },
      {
        content: <div>222</div>,
        min: 10,
        max: 40,
      },
      {
        content: <div>333</div>,
      },
      {
        content: <div>444</div>,
      },
    ]}
  />
);
```

![image](https://github.com/user-attachments/assets/4a486e15-41b9-4f4a-a497-ecd137df480e)
