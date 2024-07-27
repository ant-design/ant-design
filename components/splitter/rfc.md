## Motivation

分割面板用于，隔离区域，并支持拖拽操作。

## Components

- Splitter
  - 对外暴露组件
- Panel
  - 面板组件
- SplitBar
  - 操作组件

## API

#### Splitter

| Props         | Descriptions | Type                        | Default      |
| ------------- | ------------ | --------------------------- | ------------ |
| layout        | 布局方向     | `horizontal` \| `vertical`  | `horizontal` |
| items         | 面板配置     | `SplitterItem`              | -            |
| style         | 容器样式     | `css-properties`            | -            |
| onResizeStart | 面板配置     | `(sizes: number[]) => void` | -            |
| onResize      | 面板配置     | `(sizes: number[]) => void` | -            |
| onResizeEnd   | 面板配置     | `(sizes: number[]) => void` | -            |

#### SplitterItem

| Props       | Descriptions     | Type        | Default |
| ----------- | ---------------- | ----------- | ------- |
| collapsible | 快速折叠         | `boolean`   | `false` |
| min         | 最小阈值         | `number`    | -       |
| max         | 最大阈值         | `number`    | -       |
| size        | 受控面板大小     | `number`    | -       |
| defaultSize | 初始面板大小     | `number`    | -       |
| content     | 当前面板的内容   | `ReactNode` | -       |
| resizable   | 是否支持拖拽伸缩 | `boolean`   | `true`  |

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

<img width="1196" alt="image" src="https://github.com/user-attachments/assets/0e9e3dab-5538-4b34-bef8-462ba8e6402e">
