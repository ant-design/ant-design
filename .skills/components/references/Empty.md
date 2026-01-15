# Empty — 空状态

## 功能概述

空状态时的展示占位图。

## 输入字段

### 可选

- `description`: ReactNode，自定义描述文字，默认 `暂无数据`。
- `image`: ReactNode，自定义图片，默认 `Empty.PRESENTED_IMAGE_DEFAULT`。
- `imageStyle`: CSSProperties，图片样式。

### 内置图片

- `Empty.PRESENTED_IMAGE_DEFAULT`: 默认灰色图片。
- `Empty.PRESENTED_IMAGE_SIMPLE`: 简单线条图片。

## 使用建议

列表无数据时显示空状态；配合 description 和按钮引导用户操作；全局配置可使用 ConfigProvider。

## 示例代码

```tsx
import { Button, ConfigProvider, Empty } from 'antd';

const App: React.FC = () => (
  <>
    {/* 基础用法 */}
    <Empty />

    {/* 自定义描述 */}
    <Empty description="No data available" />

    {/* 无描述 */}
    <Empty description={false} />

    {/* 简单图片 */}
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />

    {/* 自定义图片 */}
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

    {/* 全局配置 */}
    <ConfigProvider renderEmpty={() => <Empty description="自定义空状态" />}>
      {/* Table, List 等组件无数据时会显示此空状态 */}
    </ConfigProvider>
  </>
);
```

## 返回结果

渲染一个空状态占位组件。
