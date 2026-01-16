# Empty — 空状态

## 功能概述

空状态时的展示占位图。

## 应用场景

- 当目前没有数据时，用于显式的用户提示。
- 初始化场景时的引导创建流程。

## 输入字段

### Empty 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `description`: ReactNode，自定义描述内容。
- `image`: ReactNode，设置显示图片，为 string 时表示自定义图片地址，默认 `Empty.PRESENTED_IMAGE_DEFAULT`。
- `imageStyle`: CSSProperties，图片样式。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。

## 方法

无公开方法。

## 使用建议

列表无数据时显示空状态；配合 description 和按钮引导用户操作；全局配置可使用 ConfigProvider。

## 示例代码

```tsx
import { Button, ConfigProvider, Empty } from 'antd';

const App: React.FC = () => (
  <>
    <Empty />

    <Empty description="No data available" />

    <Empty description={false} />

    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />

    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 60 }}
      description={
        <span>
          Customize <a href="#API">Description</a>
        </span>
      }
    >
      <Button type="primary">Create Now</Button>
    </Empty>

    <ConfigProvider renderEmpty={() => <Empty description="自定义空状态" />}></ConfigProvider>
  </>
);
```

## 返回结果

渲染一个空状态占位组件。
