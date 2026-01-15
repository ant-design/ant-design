# Pagination — 分页

## 功能概述

采用分页的形式分隔长列表，每次只加载一个页面。

## 输入字段

### 必填

- `total`: number，数据总数。

### 可选

- `current`: number，当前页数（受控），从 1 开始。
- `defaultCurrent`: number，默认当前页数，默认 `1`。
- `pageSize`: number，每页条数（受控）。
- `defaultPageSize`: number，默认每页条数，默认 `10`。
- `pageSizeOptions`: (string | number)[]，可选每页条数，默认 `[10, 20, 50, 100]`。
- `size`: string，尺寸，可选 `default` | `small`，默认 `default`。
- `disabled`: boolean，禁用分页。
- `showSizeChanger`: boolean，显示 pageSize 切换器。
- `showQuickJumper`: boolean | { goButton }，显示快速跳转。
- `showTotal`: (total, range) => ReactNode，显示总数。
- `showTitle`: boolean，显示 title 属性，默认 `true`。
- `showLessItems`: boolean，显示较少页码按钮。
- `hideOnSinglePage`: boolean，只有一页时隐藏分页。
- `simple`: boolean | { readOnly }，简单模式。
- `align`: string，对齐方式，可选 `start` | `center` | `end`（5.17.0+）。
- `responsive`: boolean，屏幕小时自动变 simple 模式。
- `itemRender`: (page, type, element) => ReactNode，自定义页码渲染。
- `onChange`: (page, pageSize) => void，页码或 pageSize 变化回调。
- `onShowSizeChange`: (current, size) => void，pageSize 变化回调。

## 使用建议

配合 Table 使用时通过 Table 的 pagination 属性；独立使用时控制数据切片；总数展示使用 showTotal。

## 示例代码

```tsx
import { Pagination, Space } from 'antd';
import type { PaginationProps } from 'antd';

const App: React.FC = () => {
  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    console.log('Page:', page, 'PageSize:', pageSize);
  };

  const showTotal: PaginationProps['showTotal'] = (total, range) =>
    `${range[0]}-${range[1]} of ${total} items`;

  return (
    <Space direction="vertical">
      {/* 基础用法 */}
      <Pagination defaultCurrent={1} total={50} />

      {/* 更多功能 */}
      <Pagination
        showSizeChanger
        showQuickJumper
        showTotal={showTotal}
        defaultCurrent={3}
        total={500}
        onChange={onChange}
      />

      {/* 迷你版 */}
      <Pagination size="small" total={50} />

      {/* 简洁模式 */}
      <Pagination simple defaultCurrent={2} total={50} />

      {/* 受控 */}
      <Pagination current={1} pageSize={10} total={100} onChange={onChange} />

      {/* 对齐 */}
      <Pagination align="center" defaultCurrent={1} total={50} />

      {/* 禁用 */}
      <Pagination disabled defaultCurrent={1} total={50} />
    </Space>
  );
};
```

## 返回结果

渲染一个分页组件，用于分页导航。
