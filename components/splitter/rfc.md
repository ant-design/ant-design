## Motivation

分割面板用于隔离区域，展示多个内容.

## Components

- Splitter
  - 对外暴露组件
- Panel
  - 面板组件
- SplitBar
  - 操作组件

## API

### Splitter

| Props         | Descriptions     | Type                        | Default      |
| ------------- | ---------------- | --------------------------- | ------------ |
| layout        | 布局方向         | `horizontal` \| `vertical`  | `horizontal` |
| items         | 面板配置         | `SplitterItem`              | -            |
| style         | 容器样式         | `css-properties`            | -            |
| onResizeStart | 开始拖拽之前回调 | `(sizes: number[]) => void` | -            |
| onResize      | 面板大小变化回调 | `(sizes: number[]) => void` | -            |
| onResizeEnd   | 拖拽结束回调     | `(sizes: number[]) => void` | -            |

### SplitterItem

| Props       | Descriptions                                  | Type               | Default |
| ----------- | --------------------------------------------- | ------------------ | ------- |
| collapsible | 快速折叠 `collapsible=true`时将忽略`min``max` | `boolean`          | `false` |
| min         | 最小阈值 `1-100 \| '10%' \| '200px'`          | `number \| string` | -       |
| max         | 最大阈值 `1-100 \| '10%' \| '200px'`          | `number \| string` | -       |
| size        | 受控面板大小 `1-100 \| '10%' \| '200px'`      | `number`           | -       |
| defaultSize | 初始面板大小 `1-100 \| '10%' \| '200px'`      | `number`           | -       |
| content     | 当前面板的内容                                | `ReactNode`        | -       |
| resizable   | 是否支持拖拽伸缩                              | `boolean`          | `true`  |

## Token

| Props               | Descriptions           | Type     | Default |
| ------------------- | ---------------------- | -------- | ------- |
| resizableSize       | 可改变大小标识元素大小 | `number` | `10`    |
| collapsibleIconSize | 快速折叠图标大小       | `number` | `12`    |

## Example

[preview](https://github.com/ant-design/ant-design/pull/50038#issuecomment-2246752430)

```ts
const App: React.FC = () => (
  <Splitter
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

<img width="1192" alt="image" src="https://github.com/user-attachments/assets/17da525c-77f9-4856-a190-a207f3670ec6">
