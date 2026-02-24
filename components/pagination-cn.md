---
category: Components
group: 导航
title: Pagination
subtitle: 分页
description: 分页器用于分隔长列表，每次只加载一个页面。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*8y_iTJGY_aUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*WM86SrBC8TsAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用 {#when-to-use}

- 当加载/渲染所有数据将花费很多时间时；
- 可切换页码浏览数据。

## 代码演示 {#examples}

### 基本

基础分页。

```tsx
import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => <Pagination defaultCurrent={1} total={50} />;

export default App;
```

### 方向



```tsx
import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => (
  <>
    <Pagination align="start" defaultCurrent={1} total={50} />
    <br />
    <Pagination align="center" defaultCurrent={1} total={50} />
    <br />
    <Pagination align="end" defaultCurrent={1} total={50} />
  </>
);

export default App;
```

### 更多

更多分页。

```tsx
import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => <Pagination defaultCurrent={6} total={500} />;

export default App;
```

### 改变

改变每页显示条目数。

```tsx
import React from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
  console.log(current, pageSize);
};

const App: React.FC = () => (
  <>
    <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
    />
    <br />
    <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
      disabled
    />
  </>
);

export default App;
```

### 跳转

快速跳转到某一页。

```tsx
import React from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

const onChange: PaginationProps['onChange'] = (pageNumber) => {
  console.log('Page: ', pageNumber);
};

const App: React.FC = () => (
  <>
    <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
    <br />
    <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} disabled />
  </>
);

export default App;
```

### 尺寸

小尺寸和大尺寸的分页控件。

```tsx
import React from 'react';
import type { PaginationProps } from 'antd';
import { Divider, Flex, Pagination } from 'antd';

const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`;

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Divider titlePlacement="start">Small</Divider>

    <Pagination size="small" total={50} />
    <Pagination size="small" total={50} showSizeChanger showQuickJumper />
    <Pagination size="small" total={50} showTotal={showTotal} />
    <Pagination
      size="small"
      total={50}
      disabled
      showTotal={showTotal}
      showSizeChanger
      showQuickJumper
    />

    <Divider titlePlacement="start">Large</Divider>

    <Pagination size="large" total={50} />
    <Pagination size="large" total={50} showSizeChanger showQuickJumper />
    <Pagination size="large" total={50} showTotal={showTotal} />
    <Pagination
      size="large"
      total={50}
      disabled
      showTotal={showTotal}
      showSizeChanger
      showQuickJumper
    />
  </Flex>
);

export default App;
```

### 简洁

简单的翻页。

```tsx
import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => (
  <>
    <Pagination simple defaultCurrent={2} total={50} />
    <br />
    <Pagination simple={{ readOnly: true }} defaultCurrent={2} total={50} />
    <br />
    <Pagination disabled simple defaultCurrent={2} total={50} />
  </>
);

export default App;
```

### 受控

受控制的页码。

```tsx
import React, { useState } from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

const App: React.FC = () => {
  const [current, setCurrent] = useState(3);

  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrent(page);
  };

  return <Pagination current={current} onChange={onChange} total={50} />;
};

export default App;
```

### 总数

通过设置 `showTotal` 展示总共有多少数据。

```tsx
import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => (
  <>
    <Pagination
      total={85}
      showTotal={(total) => `Total ${total} items`}
      defaultPageSize={20}
      defaultCurrent={1}
    />
    <br />
    <Pagination
      total={85}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      defaultPageSize={20}
      defaultCurrent={1}
    />
  </>
);

export default App;
```

### 全部展示

展示所有配置选项。

```tsx
import React from 'react';
import { Pagination } from 'antd';

const App: React.FC = () => (
  <Pagination
    total={85}
    showSizeChanger
    showQuickJumper
    showTotal={(total) => `Total ${total} items`}
  />
);

export default App;
```

### 上一步和下一步

修改上一步和下一步为文字链接。

```tsx
import React from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
};

const App: React.FC = () => <Pagination total={500} itemRender={itemRender} />;

export default App;
```



### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Pagination 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Flex, Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 2px dashed #ccc;
    padding: 8px;
  `,
}));

const styleFn: PaginationProps['styles'] = ({ props }) => {
  if (props.size === 'small') {
    return {
      item: {
        backgroundColor: `rgba(200, 200, 200, 0.3)`,
        marginInlineEnd: 4,
      },
    } satisfies PaginationProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const paginationSharedProps: PaginationProps = {
    total: 500,
    classNames: { root: classNames.root },
  };

  return (
    <Flex vertical gap="middle">
      <Pagination {...paginationSharedProps} styles={{ item: { borderRadius: 999 } }} />
      <Pagination {...paginationSharedProps} size="small" styles={styleFn} />
    </Flex>
  );
};

export default App;
```


## API

通用属性参考：[通用属性](/docs/react/common-props)

```jsx
<Pagination onChange={onChange} total={50} />
```

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| align | 对齐方式 | start \| center \| end | - | 5.19.0 |
| classNames | 自定义组件内部各语义化结构的类名。支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| current | 当前页数 | number | - |  |
| defaultCurrent | 默认的当前页数 | number | 1 |  |
| defaultPageSize | 默认的每页条数 | number | 10 |  |
| disabled | 禁用分页 | boolean | - |  |
| hideOnSinglePage | 只有一页时是否隐藏分页器 | boolean | false |  |
| itemRender | 用于自定义页码的结构，可用于优化 SEO | (page, type: 'page' \| 'prev' \| 'next', originalElement) => React.ReactNode | - |  |
| pageSize | 每页条数 | number | - |  |
| pageSizeOptions | 指定每页可以显示多少条 | number\[] | \[`10`, `20`, `50`, `100`] |  |
| responsive | 当 size 未指定时，根据屏幕宽度自动调整尺寸 | boolean | - |  |
| showLessItems | 是否显示较少页面内容 | boolean | false |  |
| showQuickJumper | 是否可以快速跳转至某页 | boolean \| { goButton: ReactNode } | false |  |
| showSizeChanger | 是否展示 `pageSize` 切换器 | boolean \| [SelectProps](/components/select-cn#api) | - | SelectProps: 5.21.0 |
| totalBoundaryShowSizeChanger | 当 `total` 大于该值时，`showSizeChanger` 默认为 true | number | 50 |  |
| showTitle | 是否显示原生 tooltip 页码提示 | boolean | true |  |
| showTotal | 用于显示数据总量和当前数据顺序 | function(total, range) | - |  |
| simple | 当添加该属性时，显示为简单分页 | boolean \| { readOnly?: boolean } | - |  |
| size | 组件尺寸 | `large` \| `medium` \| `small` | `medium` |  |
| styles | 自定义组件内部各语义化结构的内联样式。支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| total | 数据总数 | number | 0 |  |
| onChange | 页码或 `pageSize` 改变的回调，参数是改变后的页码及每页条数 | function(page, pageSize) | - |  |
| onShowSizeChange | pageSize 变化的回调 | function(current, size) | - |  |

## Semantic DOM

https://ant.design/components/pagination-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Pagination)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| itemActiveBg | 页码激活态背景色 | string | #ffffff |
| itemActiveBgDisabled | 页码激活态禁用状态背景色 | string | rgba(0,0,0,0.15) |
| itemActiveColor | 页码激活态文字颜色 | string | #1677ff |
| itemActiveColorDisabled | 页码激活态禁用状态文字颜色 | string | rgba(0,0,0,0.25) |
| itemActiveColorHover | 页码激活态文字颜色悬停态 | string | #4096ff |
| itemBg | 页码选项背景色 | string | #ffffff |
| itemInputBg | 输入框背景色 | string | #ffffff |
| itemLinkBg | 页码链接背景色 | string | #ffffff |
| itemSize | 页码尺寸 | number | 32 |
| itemSizeLG | 大号页码尺寸 | number | 40 |
| itemSizeSM | 小号页码尺寸 | number | 24 |
| miniOptionsSizeChangerTop | 每页展示数量选择器 top | number | 0 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadius | 基础组件的圆角大小，例如按钮、输入框、卡片等 | number |  |
| borderRadiusLG | LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。 | number |  |
| borderRadiusSM | SM号圆角，用于组件小尺寸下的圆角，如 Button、Input、Select 等输入类控件在 small size 下的圆角 | number |  |
| colorBgContainer | 组件的容器背景色，例如：默认按钮、输入框等。务必不要将其与 `colorBgElevated` 混淆。 | string |  |
| colorBgContainerDisabled | 控制容器在禁用状态下的背景色。 | string |  |
| colorBgTextActive | 控制文本在激活状态下的背景色。 | string |  |
| colorBgTextHover | 控制文本在悬停状态下的背景色。 | string |  |
| colorBorder | 默认使用的边框颜色, 用于分割不同的元素，例如：表单的分割线、卡片的分割线等。 | string |  |
| colorPrimary | 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义 | string |  |
| colorPrimaryBorder | 主色梯度下的描边用色，用在 Slider 等组件的描边上。 | string |  |
| colorPrimaryHover | 主色梯度下的悬浮态。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextDisabled | 控制禁用状态下的字体颜色。 | string |  |
| colorTextPlaceholder | 控制占位文本的颜色。 | string |  |
| controlHeightLG | 较高的组件高度 | number |  |
| controlOutline | 控制输入组件的外轮廓线颜色。 | string |  |
| controlOutlineWidth | 控制输入组件的外轮廓线宽度。 | number |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeSM | 小号字体大小 | number |  |
| fontWeightStrong | 控制标题类组件（如 h1、h2、h3）或选中项的字体粗细。 | number |  |
| lineHeight | 文本行高 | number |  |
| lineHeightLG | 大型文本行高 | number |  |
| lineType | 用于控制组件边框、分割线等的样式，默认是实线 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| lineWidthFocus | 控制线条的宽度，当组件处于聚焦态时。 | number |  |
| margin | 控制元素外边距，中等尺寸。 | number |  |
| marginSM | 控制元素外边距，中小尺寸。 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| marginXXS | 控制元素外边距，最小尺寸。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| paddingXXS | 控制元素的极小内间距。 | number |  |
| screenLG | 控制大屏幕的屏幕宽度。 | number |  |
| screenSM | 控制小屏幕的屏幕宽度。 | number |  |


