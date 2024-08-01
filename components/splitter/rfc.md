## Motivation

分割面板用于隔离区域，展示多个内容.

## Components

- Splitter
  - 对外暴露组件
- Panel
  - 对外暴露面板组件
- SplitBar
  - 操作组件

## API

### Splitter

| Props         | Descriptions     | Type                        | Default      |
| ------------- | ---------------- | --------------------------- | ------------ |
| layout        | 布局方向         | `horizontal` \| `vertical`  | `horizontal` |
| style         | 容器样式         | `css-properties`            | -            |
| onResizeStart | 开始拖拽之前回调 | `(sizes: number[]) => void` | -            |
| onResize      | 面板大小变化回调 | `(sizes: number[]) => void` | -            |
| onResizeEnd   | 拖拽结束回调     | `(sizes: number[]) => void` | -            |

### Panel

| Props       | Descriptions                                  | Type               | Default |
| ----------- | --------------------------------------------- | ------------------ | ------- |
| min         | 最小阈值 `1-100 \| '10%' \| '200px'`          | `number \| string` | -       |
| max         | 最大阈值 `1-100 \| '10%' \| '200px'`          | `number \| string` | -       |
| size        | 受控面板大小 `1-100 \| '10%' \| '200px'`      | `number`           | -       |
| defaultSize | 初始面板大小 `1-100 \| '10%' \| '200px'`      | `number`           | -       |
| collapsible | 快速折叠 `collapsible=true`时将忽略`min``max` | `boolean`          | `false` |
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
    layout={layout}
    style={{
      height: 300,
      borderRadius: '4px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Splitter.Panel defaultSize="220px" collapsible>
      <Card title="first" bordered={false}>
        <div>collapsible: true</div>
      </Card>
    </Splitter.Panel>

    <Splitter.Panel>
      <Card title="second" bordered={false}>
        <div>something</div>
      </Card>
    </Splitter.Panel>
  </Splitter>
);
```

<img width="1192" alt="image" src="https://github.com/user-attachments/assets/17da525c-77f9-4856-a190-a207f3670ec6">
