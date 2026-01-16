# Pagination — 分页

## 功能概述

分页器用于分隔长列表，每次只加载一个页面。

## 应用场景

- 当加载/渲染所有数据将花费很多时间时；。
- 可切换页码浏览数据。

## 输入字段

### Pagination 属性

#### 必填

- 无必填属性。

#### 可选

- `align`: start | center | end，对齐方式，版本 5.19.0。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), string>，自定义组件内部各语义化结构的类名。支持对象或函数。
- `current`: number，当前页数。
- `defaultCurrent`: number，默认的当前页数，默认 1。
- `defaultPageSize`: number，默认的每页条数，默认 10。
- `disabled`: boolean，禁用分页。
- `hideOnSinglePage`: boolean，只有一页时是否隐藏分页器，默认 false。
- `itemRender`: (page, type: 'page' | 'prev' | 'next', originalElement) => React.ReactNode，用于自定义页码的结构，可用于优化 SEO。
- `pageSize`: number，每页条数。
- `pageSizeOptions`: number\[]，指定每页可以显示多少条，默认 \[`10`, `20`, `50`, `100`]。
- `responsive`: boolean，当 size 未指定时，根据屏幕宽度自动调整尺寸。
- `showLessItems`: boolean，是否显示较少页面内容，默认 false。
- `showQuickJumper`: boolean | { goButton: ReactNode }，是否可以快速跳转至某页，默认 false。
- `showSizeChanger`: boolean | [SelectProps](/components/select-cn#api)，是否展示 `pageSize` 切换器，版本 SelectProps: 5.21.0。
- `totalBoundaryShowSizeChanger`: number，当 `total` 大于该值时，`showSizeChanger` 默认为 true，默认 50。
- `showTitle`: boolean，是否显示原生 tooltip 页码提示，默认 true。
- `showTotal`: function(total, range)，用于显示数据总量和当前数据顺序。
- `simple`: boolean | { readOnly?: boolean }，当添加该属性时，显示为简单分页。
- `size`: `default` | `small` | `large`，组件尺寸，默认 `default`。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties>，自定义组件内部各语义化结构的内联样式。支持对象或函数。
- `total`: number，数据总数，默认 0。
- `onChange`: function(page, pageSize)，页码或 `pageSize` 改变的回调，参数是改变后的页码及每页条数。
- `onShowSizeChange`: function(current, size)，pageSize 变化的回调。

## 方法

无公开方法。

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
      <Pagination defaultCurrent={1} total={50} />

      <Pagination
        showSizeChanger
        showQuickJumper
        showTotal={showTotal}
        defaultCurrent={3}
        total={500}
        onChange={onChange}
      />

      <Pagination size="small" total={50} />

      <Pagination simple defaultCurrent={2} total={50} />

      <Pagination current={1} pageSize={10} total={100} onChange={onChange} />

      <Pagination align="center" defaultCurrent={1} total={50} />

      <Pagination disabled defaultCurrent={1} total={50} />
    </Space>
  );
};
```

## 返回结果

渲染一个分页组件，用于分页导航。
